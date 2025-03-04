package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDbMerchantRepository implements MerchantRepository {

    private final DynamoDbTable<Merchant> merchantTable;

    /**
     * Create a new merchant and stores it in the database
     *
     * @param merchant Merchant data to be stored
     * @return The created merchant with a generated id
     */
    @Override
    public Merchant create(Merchant merchant) {
        if (merchant.getId() == null) {
            merchant.setId(UUID.randomUUID().toString());
        }
        merchantTable.putItem(merchant);
        return merchant;
    }

    /**
     * Find a merchant by id in the database
     *
     * @param id Merchant id
     * @return The merchant if found, empty otherwise
     */
    @Override
    public Optional<Merchant> findById(String id) {
        Key key = Key.builder()
                .partitionValue(Merchant.MERCHANT_PK_PREFIX + id)
                .sortValue(Merchant.MERCHANT_SK_PREFIX)
                .build();
        return Optional.ofNullable(merchantTable.getItem(key));
    }

    /**
     * Find a merchant by name or part of it in the database
     *
     * @param name Merchant name or part of it
     * @return The list of merchants found
     */
    @Override
    public List<Merchant> findByName(String name) {
        return merchantTable.scan().items().stream()
                .filter(m -> m.getPartitionKey().startsWith("MERCHANT#") && m.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Update a merchant in the database
     *
     * @param merchant Merchant data to be updated
     * @return The updated merchant
     */
    @Override
    public Merchant updateMerchant(Merchant merchant) {
        merchantTable.updateItem(merchant);
        return merchant;
    }

    /**
     * Find merchants that belong to a client in the database
     *
     * @param clientId Client id
     * @return The list of merchants found
     */
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

    /**
     * Find all merchants in the database
     *
     * @return The list of merchants found
     */
    @Override
    public List<Merchant> findAll() {
        return merchantTable.scan().items().stream()
                .filter(m -> m.getPartitionKey().startsWith("MERCHANT#"))
                .collect(Collectors.toList());
    }
}
