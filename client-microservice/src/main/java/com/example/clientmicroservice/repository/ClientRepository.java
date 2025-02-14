package com.example.clientmicroservice.repository;

import com.example.clientmicroservice.model.Client;

import java.util.List;
import java.util.Optional;

public interface ClientRepository {
    List<Client> findAll();
    Client create(Client client);
    Optional<Client> findById(String id);
    //List<Client> findByName(String name);
    //void updateClient(Client client);
}
