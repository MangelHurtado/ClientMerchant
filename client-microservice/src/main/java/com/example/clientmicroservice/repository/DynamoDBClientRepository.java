package com.example.clientmicroservice.repository;

import com.example.clientmicroservice.model.Client;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
        DynamoDbIndex<Client> gsi = clientTable.index("GSI1");

        var results = gsi.query(r -> r.queryConditional(
                QueryConditional.keyEqualTo(k -> k.partitionValue("EMAIL#" + email))
        ));

        return StreamSupport.stream(results.spliterator(), false)
                .flatMap(page -> page.items().stream())
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
