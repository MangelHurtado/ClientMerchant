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

    /**
     * Create a new client and stores it in the database
     *
     * @param client Client data to be stored
     * @return The created client with a generated id
     */
    @Override
    public Client create(Client client) {
        String clientId = UUID.randomUUID().toString();
        client.setId(clientId);
        clientTable.putItem(client);
        return client;
    }

    /**
     * Find a client by id in the database
     *
     * @param id Client id to be found
     * @return The client if found, empty otherwise
     */
    @Override
    public Optional<Client> findById(String id) {
        Key key = Key.builder()
                .partitionValue(Client.CLIENT_PK_PREFIX + id)
                .sortValue(Client.CLIENT_SK_PREFIX)
                .build();

        return Optional.ofNullable(clientTable.getItem(key));
    }

    /**
     * Find a client by email in the database
     *
     * @param email Client email to be found
     * @return The client if found, empty otherwise
     */
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

    /**
     * Find a client by name or part of it in the database
     *
     * @param name Client name or part of it to be found
     * @return List of clients with the given name or part of it
     */
    @Override
    public List<Client> findByName(String name) {
        return clientTable.scan().items().stream()
                .filter(c -> c.getPartitionKey().startsWith("CLIENT#") && c.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Update a client in the database
     *
     * @param client Client data to be updated
     * @return The updated client
     */
    @Override
    public Client updateClient(Client client) {
        clientTable.updateItem(client);
        return client;
    }
}
