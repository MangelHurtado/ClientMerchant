package com.example.merchantmicroservice.model;

import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbIgnore;

@DynamoDbBean
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Merchant extends MainTable{

    public static final String MERCHANT_PK_PREFIX = "MERCHANT#";
    public static final String MERCHANT_SK_PREFIX = "METADATA";

    private String name;
    private String address;
    private MerchantType merchantType;
    private String clientId;

    public void setId(String id, String clientId) {
        this.partitionKey = MerchantKeyBuilder.makePartitionKey(id);
        this.sortKey = MerchantKeyBuilder.makeSortKey();
        this.gIndex2Pk = "CLIENT#" + clientId;
    }

    @DynamoDbIgnore
    public String getId() { return getPartitionKey().substring(MERCHANT_PK_PREFIX.length()); }

    public static class MerchantKeyBuilder {
        private MerchantKeyBuilder() {}

        public static String makePartitionKey(String id) { return MERCHANT_PK_PREFIX + id; }
        public static String makeSortKey() { return MERCHANT_SK_PREFIX; }
    }
}
