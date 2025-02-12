package com.example.merchantmicroservice.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDBConfig {

    @Value("${amazon.dynamodb.endpoint}")
    private String dynamoDbEndpoint;

    @Value("${amazon.accessKey}")
    private String accessKey;

    @Value("${amazon.aws.secretKey}")
    private String secretKey;

    @Value("${amazon.aws.region}")
    private String region;

    @Bean
    public AmazonDynamoDB amazonDynamoDB(){
        return AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(dynamoDbEndpoint, region))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();
    }
}
