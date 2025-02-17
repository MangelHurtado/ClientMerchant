package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDbMerchantRepository implements MerchantRepository {

    private final DynamoDbTable<Merchant> merchantTable;

    @Override
    public Merchant create(Merchant merchant) {
        String merchantId = UUID.randomUUID().toString();
        merchant.setId(merchantId, merchant.getClientId());
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
        QueryConditional skBeginsWithQuery = buildSkBeginsWithKeyQuery(clientId);

        QueryEnhancedRequest reverseOrderQuery = QueryEnhancedRequest
                .builder()
                .queryConditional(skBeginsWithQuery)
                .scanIndexForward(Boolean.FALSE)
                .build();

        return merchantTable.query(reverseOrderQuery)
                .items()
                .stream()
                .collect(Collectors.toList());
    }

    private QueryConditional buildSkBeginsWithKeyQuery(String clientId) {
        return QueryConditional.sortBeginsWith(
                Key.builder()
                        .partitionValue("CLIENT#" + clientId)
                        .sortValue(Merchant.MERCHANT_SK_PREFIX)
                        .build()
        );
    }
}
