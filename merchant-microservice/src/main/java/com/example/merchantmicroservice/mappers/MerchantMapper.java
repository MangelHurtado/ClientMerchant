package com.example.merchantmicroservice.mappers;

import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantInputDTO;
import com.example.merchantmicroservice.model.dto.MerchantOutputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MerchantMapper {
    @Mapping(target = "id", ignore = true)
    Merchant toEntity(MerchantInputDTO merchantInputDTO);
    MerchantOutputDTO toDTO(Merchant merchant);

    void updateEntity(MerchantInputDTO merchantInputDTO, @MappingTarget Merchant merchant);
}