package com.example.merchantmicroservice.model.dto;

import com.example.merchantmicroservice.model.MerchantType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MerchantOutputDTO {
    private String id;
    private String name;
    private String address;
    private MerchantType merchantType;
    private String clientId;
}