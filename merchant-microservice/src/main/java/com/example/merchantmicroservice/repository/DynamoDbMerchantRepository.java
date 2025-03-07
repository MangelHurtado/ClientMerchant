package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

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
        Expression expression = Expression.builder()
                .expression("begins_with(PK, :pkPrefix)")
                .expressionValues(
                        Collections.singletonMap(":pkPrefix", AttributeValue.builder()
                                .s(Merchant.MERCHANT_PK_PREFIX).build()))
                .build();

        ScanEnhancedRequest scanEnhancedRequest = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        return merchantTable.scan(scanEnhancedRequest)
                .stream()
                .flatMap(page -> page.items().stream())
                .filter(merchant -> merchant.getName().toLowerCase().contains(name.toLowerCase()))
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
        merchant.setClientId(merchant.getClientId());
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
                    QueryConditional.keyEqualTo(k -> k.partitionValue(Merchant.MERCHANT_GSI1_PREFIX + clientId))
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
        Expression expression = Expression.builder()
                .expression("begins_with(PK, :skPrefix)")
                .expressionValues(
                        Collections.singletonMap(":skPrefix", AttributeValue.builder()
                                .s(Merchant.MERCHANT_PK_PREFIX).build()))
                .build();

        ScanEnhancedRequest scanEnhancedRequest = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        return merchantTable.scan(scanEnhancedRequest)
                .stream()
                .flatMap(page -> page.items().stream())
                .collect(Collectors.toList());
    }
}
