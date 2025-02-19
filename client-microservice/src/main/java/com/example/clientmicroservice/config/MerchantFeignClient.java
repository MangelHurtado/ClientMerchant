package com.example.clientmicroservice.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "merchant-microservice", url = "${merchant-service.url}")
public interface MerchantFeignClient {
    @GetMapping("/merchant/{id}")
    Object findById(@PathVariable("id") String merchantId, @RequestParam(required = false, defaultValue = "false") boolean simpleOutput);
}

