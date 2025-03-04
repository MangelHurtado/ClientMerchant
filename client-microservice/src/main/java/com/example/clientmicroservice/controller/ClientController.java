package com.example.clientmicroservice.controller;

import com.example.clientmicroservice.mappers.ClientMapper;
import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    /**
     * Create a new client
     *
     * @param clientInputDTO Client data
     * @return Response with the created client
     */
    @PostMapping
    public ResponseEntity<ClientOutputDTO> createClient(@Valid @RequestBody ClientInputDTO clientInputDTO) {
        return ResponseEntity.ok(clientMapper.toDTO(clientService.createClient(clientInputDTO)));
    }

    /**
     * Find a client by id
     *
     * @param id Client id
     * @param simpleOutput If true, only the id will be returned
     * @return Response with the client
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClientOutputDTO> findById(@PathVariable String id,  @RequestParam(required = false) boolean simpleOutput) {
        return ResponseEntity.ok(clientMapper.toDTO(clientService.findById(id, simpleOutput)));
    }

    /**
     * Find a client by email
     *
     * @param email Client email
     * @return Response with the client
     */
    @GetMapping("/search/by-email")
    public ResponseEntity<ClientOutputDTO> findByEmail(@RequestParam String email) {
        return ResponseEntity.ok(clientMapper.toDTO(clientService.findByEmail(email)));
    }

    /**
     * Find a client by name or part of it
     *
     * @param name Client name or part of it
     * @return Response with the client list found
     */
    @GetMapping("/search/by-name")
    public ResponseEntity<List<ClientOutputDTO>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(clientService.findByName(name).stream().map(clientMapper::toDTO).collect(Collectors.toList()));
    }

    /**
     * Update a client
     *
     * @param id Client id
     * @param clientInputDTO Client data
     * @return Response with the updated client
     */
    @PutMapping("/{id}")
    public ResponseEntity<ClientOutputDTO> updateClient(@PathVariable String id, @Valid @RequestBody ClientInputDTO clientInputDTO) {
        return ResponseEntity.ok(clientMapper.toDTO(clientService.updateClient(id, clientInputDTO)));
    }

    /**
     * Check if a merchant exists
     *
     * @param merchantId Merchant id
     * @return Response with the result
     */
    @GetMapping("/check-merchant")
    public ResponseEntity<Boolean> checkMerchantExists(@RequestParam String merchantId) {
        return ResponseEntity.ok(clientService.checkMerchantExists(merchantId));
    }

    /**
     * Find all clients
     *
     * @return Response with the client list found
     */
    @GetMapping
    public ResponseEntity<List<ClientOutputDTO>> findAll() {
        return ResponseEntity.ok(clientService.findAll().stream().map(clientMapper::toDTO).collect(Collectors.toList()));
    }
}
