package com.example.clientmicroservice.mappers;

import com.example.clientmicroservice.model.Client;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ClientMapper {

    @Mapping(target = "id", ignore = true)
    Client toEntity(ClientInputDTO clientInputDTO);

    ClientOutputDTO toDTO(Client client);
}
