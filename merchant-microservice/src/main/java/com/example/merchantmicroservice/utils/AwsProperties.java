package com.example.merchantmicroservice.utils;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Getter
@ConfigurationProperties("aws")
@ConstructorBinding
public class AwsProperties {
    private final String endpointOverride;
    private final String region;
    private final String dynamoDbTableName;
    private final AwsCredentials credentials;

    public AwsProperties(String endpointOverride, String region, String dynamoDbTableName, AwsCredentials credentials) {
        this.endpointOverride = endpointOverride;
        this.region = region;
        this.dynamoDbTableName = dynamoDbTableName;
        this.credentials = credentials;
    }
}

