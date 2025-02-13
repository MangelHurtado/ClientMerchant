package com.example.merchantmicroservice.model.dto;

import com.example.merchantmicroservice.model.MerchantType;
import lombok.*;

@Getter
@AllArgsConstructor
public class MerchantResponse {
    private final String id;
    private final String name;
    private final String address;
    private final MerchantType merchantType;
}


