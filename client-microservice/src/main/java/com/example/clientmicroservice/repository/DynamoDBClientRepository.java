package com.example.clientmicroservice.repository;

import com.example.clientmicroservice.model.Client;
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
public class DynamoDBClientRepository implements ClientRepository{

    private final DynamoDbTable<Client> clientTable;

    @Override
    public List<Client> findAll() {
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":skPrefix", AttributeValue.builder().s(Client.CLIENT_SK_PREFIX).build());

        Expression expression = Expression.builder()
                .expression("begins_with(SK, :skPrefix)")
                .expressionValues(expressionValues)
                .build();

        ScanEnhancedRequest scanEnhancedRequest = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        return clientTable.scan(scanEnhancedRequest)
                .stream()
                .flatMap(page -> page.items().stream())
                .collect(Collectors.toList());
    }

    @Override
    public Client create(Client client) {
        String clientId = UUID.randomUUID().toString();
        client.setId(clientId);
        clientTable.putItem(client);
        return client;
    }

    @Override
    public Optional<Client> findById(String id) {
        Key key = Key.builder()
                .partitionValue(Client.CLIENT_PK_PREFIX + id)
                .sortValue(Client.CLIENT_SK_PREFIX)
                .build();

        return Optional.ofNullable(clientTable.getItem(key));
    }

}
