package com.example.clientmicroservice.service;

import com.example.clientmicroservice.config.MerchantFeignClient;
import com.example.clientmicroservice.mappers.ClientMapper;
import com.example.clientmicroservice.model.Client;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
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
    public Client createClient(ClientInputDTO clientInputDTO) {
        Client client = clientMapper.toEntity(clientInputDTO);
        clientRepository.create(client);
        return client;
    }

    /**
     * Find a client by id
     *
     * @param id Client id
     * @param simpleOutput If true, only the id will be returned
     * @return Client
     * @throws NoSuchElementException If the client is not found
     */
    public Client findById(String id, boolean simpleOutput) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));

        if (simpleOutput) {
            Client voidClient = new Client();
            voidClient.setId(client.getId());
            return voidClient;
        }
        return client;
    }

    /**
     * Find a client by email
     *
     * @param email Client email
     * @return Client
     * @throws NoSuchElementException If the client is not found
     */
    public Client findByEmail(String email) {
        return clientRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Client not found with the given email"));
    }

    /**
     * Find a client by name or part of it
     *
     * @param name Client name or part of it
     * @return List of clients with the given name or part of it
     * @throws NoSuchElementException If no clients are found
     */
    public List<Client> findByName(String name) {
        List<Client> clients = clientRepository.findByName(name);
        if (clients.isEmpty()) {
            throw new NoSuchElementException("No clients found with the given name");
        }
        return clients;
    }

    /**
     * Update a client
     *
     * @param id Client id
     * @param clientInputDTO Client data
     * @return Updated client
     * @throws NoSuchElementException If the client is not found
     */
    public Client updateClient(String id, ClientInputDTO clientInputDTO) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
        clientMapper.updateEntity(clientInputDTO, client);
        clientRepository.updateClient(client);
        return client;
    }

    /**
     * Check if a merchant exists
     *
     * @param merchantId Merchant id
     * @return True if the merchant exists, false otherwise
     */
    public boolean checkMerchantExists(String merchantId) {
        try {
            merchantFeignClient.findById(merchantId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Find all clients
     *
     * @return List of all clients
     * @throws NoSuchElementException If no clients are found
     */
    public List<Client> findAll() {
        List<Client> clients = clientRepository.findAll();
        if (clients.isEmpty()) {
            throw new NoSuchElementException("No clients found");
        }
        return clients;
    }
}
