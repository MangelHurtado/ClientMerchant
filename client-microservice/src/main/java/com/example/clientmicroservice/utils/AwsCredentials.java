package com.example.clientmicroservice.utils;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Getter
@ConfigurationProperties(prefix = "aws.credentials")
@ConstructorBinding
public class AwsCredentials {

    private final String accessKey;
    private final String secretKey;

    public AwsCredentials(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }
}