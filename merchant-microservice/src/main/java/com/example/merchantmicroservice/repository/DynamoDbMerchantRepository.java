package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDbMerchantRepository implements MerchantRepository {

    private final DynamoDbTable<Merchant> merchantTable;

    @Override
    public List<Merchant> findAll() {
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":skPrefix", AttributeValue.builder().s(Merchant.MERCHANT_SK_PREFIX).build());

        Expression expression = Expression.builder()
                .expression("begins_with(SK, :skPrefix)")
                .expressionValues(expressionValues)
                .build();

        ScanEnhancedRequest scanEnhancedRequest = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        return merchantTable.scan(scanEnhancedRequest)
                .stream()
                .flatMap(page -> page.items().stream())
                .collect(Collectors.toList());
    }


    @Override
    public Merchant create(Merchant merchant) {
        String merchantId = UUID.randomUUID().toString();
        merchant.setId(merchantId);
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

    public List<Merchant> findByName(String name) {
        Expression expression = Expression.builder()
                .expression("contains(#name, :name)")
                .expressionNames(Collections.singletonMap("#name", "name"))
                .expressionValues(Collections.singletonMap(":name", AttributeValue.builder().s(name).build()))
                .build();

        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        return merchantTable.scan(scanRequest)
                .stream()
                .flatMap(page -> page.items().stream())
                .collect(Collectors.toList());
    }

    public void updateMerchant(Merchant merchant) {
        merchantTable.updateItem(merchant);
    }
}
