package com.example.clientmicroservice.model.dto;

import com.example.clientmicroservice.model.MerchantType;
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
}


