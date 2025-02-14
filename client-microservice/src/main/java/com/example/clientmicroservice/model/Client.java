package com.example.clientmicroservice.model;

import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbIgnore;

@DynamoDbBean
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Client extends MainTable{

    public static final String CLIENT_PK_PREFIX = "CLIENT#";
    public static final String CLIENT_SK_PREFIX = "CLIENT#";

    private String name;
    private String surname;
    private String cifNifNie;
    private String phone;
    private String email;

    public void setId(String id) {
        setPartitionKey(ClientKeyBuilder.makePartitionKey(id));
        setSortKey(ClientKeyBuilder.makeSortKey());
    }

    @DynamoDbIgnore
    public String getId() { return getPartitionKey().substring(CLIENT_PK_PREFIX.length()); }

    public static class ClientKeyBuilder {
        private ClientKeyBuilder() {
        }

        public static String makePartitionKey(String id) { return CLIENT_PK_PREFIX + id; }

        public static String makeSortKey(){ return CLIENT_SK_PREFIX; }

    }
}
