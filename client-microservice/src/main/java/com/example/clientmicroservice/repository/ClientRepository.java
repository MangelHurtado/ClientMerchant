package com.example.clientmicroservice.repository;

import com.example.clientmicroservice.model.Client;

import java.util.List;
import java.util.Optional;

public interface ClientRepository {
    Client create(Client client);
    Optional<Client> findById(String id);
    List<Client> findByEmail(String email);
    List<Client> findByName(String name);
    Client updateClient(Client client);
}
