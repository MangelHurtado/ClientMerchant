package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDbMerchantRepository implements MerchantRepository {

    private final DynamoDbTable<Merchant> merchantTable;

    @Override
    public Merchant create(Merchant merchant) {
        if (merchant.getId() == null) {
            merchant.setId(UUID.randomUUID().toString());
        }
        merchantTable.putItem(merchant);
        return merchant;
    }

    @Override
    public Optional<Merchant> findById(String id) {
        Key key = Key.builder()
                .partitionValue(Merchant.MERCHANT_PK_PREFIX + id)
                .sortValue(Merchant.MERCHANT_SK_PREFIX)
                .build();
        return Optional.ofNullable(merchantTable.getItem(key));
    }

    @Override
    public List<Merchant> findByName(String name) {
        return merchantTable.scan().items().stream()
                .filter(m -> m.getPartitionKey().startsWith("MERCHANT#") && m.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public Merchant updateMerchant(Merchant merchant) {
        merchantTable.updateItem(merchant);
        return merchant;
    }

    @Override
    public List<Merchant> findByClient(String clientId) {
            DynamoDbIndex<Merchant> gsi = merchantTable.index("GSI1");

            var results = gsi.query(r -> r.queryConditional(
                    QueryConditional.keyEqualTo(k -> k.partitionValue(clientId))
            ));

            List<Merchant> merchants = new ArrayList<>();
            results.forEach(page -> merchants.addAll(page.items()));
            return merchants;
    }
}
