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
public class Client extends MainTable {

    public static final String CLIENT_PK_PREFIX = "CLIENT#";
    public static final String CLIENT_SK_PREFIX = "METADATA";

    private String name;
    private String surname;
    private String cifNifNie;
    private String phone;
    private String email;

    public void setId(String id) {
        setPartitionKey(CLIENT_PK_PREFIX + id);
        setSortKey(CLIENT_SK_PREFIX);
    }

    @DynamoDbIgnore
    public String getId() {
        return getPartitionKey().substring(CLIENT_PK_PREFIX.length());
    }

    public void setEmail(String email) {
        this.email = email;
        setGIndex2Pk("EMAIL#" + email);
    }
}
