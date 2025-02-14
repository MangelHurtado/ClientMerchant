package com.example.merchantmicroservice.mappers;

import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantRequest;
import com.example.merchantmicroservice.model.dto.MerchantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MerchantMapper {
    @Mapping(target = "id", ignore = true)
    Merchant toEntity(MerchantRequest merchantRequest);
    MerchantResponse toResponse(Merchant merchant);

    void updateEntity(MerchantRequest merchantRequest, @MappingTarget Merchant merchant);
}