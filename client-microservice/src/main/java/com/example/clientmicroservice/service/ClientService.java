package com.example.clientmicroservice.service;

import com.example.clientmicroservice.mappers.ClientMapper;
import com.example.clientmicroservice.model.Client;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public ClientOutputDTO findByEmail(String email) {
        return clientRepository.findByEmail(email)
                .map(clientMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Client not found with the given email"));
    }

    public List<ClientOutputDTO> findByName(String name) {
        List<Client> clients = clientRepository.findByName(name);
        if (clients.isEmpty()) {
            throw new NoSuchElementException("No clients found with the given name");
        }
        return clients.stream()
                .map(clientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClientOutputDTO updateClient(String id, ClientInputDTO clientRequest) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
        clientMapper.updateEntity(clientRequest, client);
        clientRepository.updateClient(client);
        return clientMapper.toDTO(client);
    }
}
