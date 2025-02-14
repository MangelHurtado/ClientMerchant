package com.example.clientmicroservice.controller;

import com.example.clientmicroservice.model.dto.ClientInputDTO;
import com.example.clientmicroservice.model.dto.ClientOutputDTO;
import com.example.clientmicroservice.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientOutputDTO> createClient(@Valid @RequestBody ClientInputDTO clientInputDTO) {
        return ResponseEntity.ok(clientService.createClient(clientInputDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientOutputDTO> findById(@PathVariable String id,  @RequestParam(required = false) boolean simpleOutput) {
        return ResponseEntity.ok(clientService.findById(id, simpleOutput));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClientOutputDTO>> findByEmail(@RequestParam String email) {
        return ResponseEntity.ok(clientService.findByEmail(email));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClientOutputDTO>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(clientService.findByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientOutputDTO> updateClient(@PathVariable String id, @Valid @RequestBody ClientInputDTO clientInputDTO) {
        return ResponseEntity.ok(clientService.updateClient(id, clientInputDTO));
    }


}
