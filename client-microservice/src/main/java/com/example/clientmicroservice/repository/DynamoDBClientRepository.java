package com.example.clientmicroservice.repository;

import com.example.clientmicroservice.model.Client;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDBClientRepository implements ClientRepository {

    private final DynamoDbTable<Client> clientTable;

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

    @Override
    public Optional<Client> findByEmail(String email) {
        QueryEnhancedRequest queryRequest = QueryEnhancedRequest.builder()
                .queryConditional(QueryConditional.keyEqualTo(
                        Key.builder().partitionValue("EMAIL#" + email).build()))
                .build();

        return clientTable.query(queryRequest)
                .items()
                .stream()
                .findFirst();
    }

    @Override
    public List<Client> findByName(String name) {
        return clientTable.scan().items().stream()
                .filter(c -> c.getPartitionKey().startsWith("CLIENT#") && c.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }


    @Override
    public Client updateClient(Client client) {
        clientTable.updateItem(client);
        return client;
    }
}
