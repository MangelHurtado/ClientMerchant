package com.example.merchantmicroservice.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class MainTable {

    @DynamoDBHashKey(attributeName = "PK")
    private String pk;

    @DynamoDBRangeKey(attributeName = "SK")
    private String sk;

    @DynamoDBAttribute(attributeName = "id")
    private String id;

    @DynamoDBAttribute(attributeName = "status")
    private String status;

    @DynamoDBAttribute(attributeName = "gIndex2Pk")
    private String gIndex2Pk;

    @DynamoDBAttribute(attributeName = "createdDate")
    private LocalDateTime createdDate;
}
