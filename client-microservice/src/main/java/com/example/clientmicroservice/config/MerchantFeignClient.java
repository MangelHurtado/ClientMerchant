package com.example.clientmicroservice.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "merchant-microservice", url = "${merchant-service.url}")
public interface MerchantFeignClient {
    @GetMapping("/merchant/{id}")
    boolean findById(@PathVariable("id") String merchantId);
}

