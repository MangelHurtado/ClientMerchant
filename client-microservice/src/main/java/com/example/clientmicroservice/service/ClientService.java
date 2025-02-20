package com.example.clientmicroservice.service;

import com.example.clientmicroservice.config.MerchantFeignClient;
import com.example.clientmicroservice.mappers.ClientMapper;
import com.example.clientmicroservice.model.Client;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final MerchantFeignClient merchantFeignClient;

    /**
     * Create a new client
     *
     * @param clientInputDTO Client data
     * @return Created client
     */
    public ClientOutputDTO createClient(ClientInputDTO clientInputDTO) {
        Client client = clientMapper.toEntity(clientInputDTO);
        clientRepository.create(client);
        return clientMapper.toDTO(client);
    }

    /**
     * Find a client by id
     *
     * @param id Client id
     * @param simpleOutput If true, only the id will be returned
     * @return Client
     */
    public ClientOutputDTO findById(String id, boolean simpleOutput) {
        return clientRepository.findById(id)
                .map(client -> simpleOutput ?
                        new ClientOutputDTO(client.getId(), null, null, null, null, null) :
                        clientMapper.toDTO(client))
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
    }

    /**
     * Find a client by email
     *
     * @param email Client email
     * @return Client
     */
    public ClientOutputDTO findByEmail(String email) {
        return clientRepository.findByEmail(email)
                .map(clientMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Client not found with the given email"));
    }

    /**
     * Find a client by name or part of it
     *
     * @param name Client name or part of it
     * @return List of clients with the given name or part of it
     */
    public List<ClientOutputDTO> findByName(String name) {
        List<Client> clients = clientRepository.findByName(name);
        if (clients.isEmpty()) {
            throw new NoSuchElementException("No clients found with the given name");
        }
        return clients.stream()
                .map(clientMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update a client
     *
     * @param id Client id
     * @param clientInputDTO Client data
     * @return Updated client
     */
    public ClientOutputDTO updateClient(String id, ClientInputDTO clientInputDTO) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
        clientMapper.updateEntity(clientInputDTO, client);
        clientRepository.updateClient(client);
        return clientMapper.toDTO(client);
    }

    /**
     * Check if a merchant exists
     *
     * @param merchantId Merchant id
     * @param simpleOutput If true, only the id will be returned
     * @return True if the merchant exists, false otherwise
     */
    public boolean checkMerchantExists(String merchantId, boolean simpleOutput) {
        try {
            merchantFeignClient.findById(merchantId, simpleOutput);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
