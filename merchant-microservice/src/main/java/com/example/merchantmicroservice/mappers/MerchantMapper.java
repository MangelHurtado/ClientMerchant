package com.example.merchantmicroservice.mappers;

import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantRequest;
import com.example.merchantmicroservice.model.dto.MerchantResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MerchantMapper {

    Merchant toEntity(MerchantRequest request);

    MerchantResponse toResponse(Merchant merchant);
}
