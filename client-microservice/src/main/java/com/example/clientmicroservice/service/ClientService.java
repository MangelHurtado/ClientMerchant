package com.example.clientmicroservice.service;

import com.example.clientmicroservice.mappers.ClientMapper;
import com.example.clientmicroservice.model.Client;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientOutputDTO createClient(ClientInputDTO clientInputDTO) {
        Client client = clientMapper.toEntity(clientInputDTO);
        clientRepository.create(client);
        return clientMapper.toDTO(client);
    }

    public ClientOutputDTO findById(String id, boolean simpleOutput) {
        return clientRepository.findById(id)
                .map(client -> simpleOutput ? new ClientOutputDTO(client.getId(), null, null, null, null, null) : clientMapper.toDTO(client))
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
    }
}
