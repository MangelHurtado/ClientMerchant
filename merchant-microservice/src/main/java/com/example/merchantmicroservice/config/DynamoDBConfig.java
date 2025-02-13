package com.example.merchantmicroservice.config;


import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.utils.AwsCredentials;
import com.example.merchantmicroservice.utils.AwsProperties;
import lombok.var;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.net.URI;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties({AwsCredentials.class, AwsProperties.class})
public class DynamoDBConfig {

    @Bean
    public DynamoDbClient dynamoDbClient(AwsProperties properties,
                                         AwsBasicCredentials awsCredentials) {
        var builder = DynamoDbClient.builder().region(Region.of(properties.getRegion()));
        if (properties.getEndpointOverride() != null) {
            builder.endpointOverride(URI.create(properties.getEndpointOverride()));
        }
        return builder.credentialsProvider(() -> awsCredentials).build();
    }

    @Bean
    public AwsBasicCredentials awsCredentials(AwsProperties properties) {
        return AwsBasicCredentials.create(properties.getCredentials().getAccessKey(),
                properties.getCredentials().getSecretKey());
    }

    @Bean
    public DynamoDbEnhancedClient dynamoDbEnhancedClient(DynamoDbClient dynamoDbClient) {
        return DynamoDbEnhancedClient.builder().dynamoDbClient(dynamoDbClient).build();
    }
}
