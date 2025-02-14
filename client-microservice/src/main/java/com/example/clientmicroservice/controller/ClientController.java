package com.example.clientmicroservice.controller;

import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientOutputDTO> createClient(@RequestBody ClientInputDTO clientInputDTO) {
        return ResponseEntity.ok(clientService.createClient(clientInputDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientOutputDTO> findById(@PathVariable String id,  @RequestParam(required = false) boolean simpleOutput) {
        return ResponseEntity.ok(clientService.findById(id, simpleOutput));
    }


}
