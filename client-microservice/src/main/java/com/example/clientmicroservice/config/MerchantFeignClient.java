package com.example.clientmicroservice.config;

import com.example.clientmicroservice.model.dto.MerchantOutputDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "merchant-service", url = "${aws.endpoint-override}")
public interface MerchantFeignClient {
    @GetMapping("/merchants/{id}")
    ResponseEntity<MerchantOutputDTO> findMerchantById(@PathVariable("id") String merchantId);
}

