package com.example.merchantmicroservice.model;

import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;
import java.time.Instant;

@Data
public class MainTable {

    protected String partitionKey;
    protected String sortKey;
    protected String id;
    protected String status;
    protected String gIndex2Pk;
    protected Instant createdDate;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPartitionKey() { return partitionKey; }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSortKey() { return sortKey; }

    @DynamoDbAttribute("id")
    public String getId() { return id; }

    @DynamoDbAttribute("status")
    public String getStatus() { return status; }

    @DynamoDbAttribute("gIndex2Pk")
    @DynamoDbSecondaryPartitionKey(indexNames = "GSI1")
    public String getGIndex2Pk() { return gIndex2Pk; }

    @DynamoDbAttribute("createdDate")
    public Instant getCreatedDate() { return createdDate; }
}
