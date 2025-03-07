package com.example.merchantmicroservice.model;

import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Merchant extends MainTable {
    public static final String MERCHANT_PK_PREFIX = "MERCHANT#";
    public static final String MERCHANT_SK_PREFIX = "METADATA";
    public static final String MERCHANT_GSI1_PREFIX = "CLIENTID#";

    private String name;
    private String address;
    private MerchantType merchantType;
    private String clientId;

    public void setId(String id) {
        setPartitionKey(MERCHANT_PK_PREFIX + id);
        setSortKey(MERCHANT_SK_PREFIX);
    }

    public String getId() {
        return getPartitionKey().substring(MERCHANT_PK_PREFIX.length());
    }

    @DynamoDbAttribute("clientId")
    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
        setGIndex2Pk(MERCHANT_GSI1_PREFIX + clientId);
    }
}
