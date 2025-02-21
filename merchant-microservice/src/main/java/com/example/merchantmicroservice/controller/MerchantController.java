package com.example.merchantmicroservice.controller;

import com.example.merchantmicroservice.mappers.MerchantMapper;
import com.example.merchantmicroservice.model.dto.MerchantInputDTO;
import com.example.merchantmicroservice.model.dto.MerchantOutputDTO;
import com.example.merchantmicroservice.service.MerchantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/merchant")
@RequiredArgsConstructor
public class MerchantController {

    private final MerchantService merchantService;
    private final MerchantMapper merchantMapper;

    /**
     * Create a new merchant
     *
     * @param merchantInputDTO Merchant data
     * @return Response with the created merchant
     */
    @PostMapping
    public ResponseEntity<MerchantOutputDTO> createMerchant(@Valid @RequestBody MerchantInputDTO merchantInputDTO) {
        return ResponseEntity.ok(merchantMapper.toDTO(merchantService.createMerchant(merchantInputDTO)));
    }

    /**
     * Find a merchant by id
     *
     * @param id Merchant id
     * @param simpleOutput If true, only the id will be returned
     * @return Response with the merchant
     */
    @GetMapping("/{id}")
    public ResponseEntity<MerchantOutputDTO> findById(@PathVariable String id, @RequestParam(required = false, defaultValue = "false") boolean simpleOutput) {
        return ResponseEntity.ok(merchantMapper.toDTO(merchantService.findById(id, simpleOutput)));
    }

    /**
     * Find a merchant by name or part of it
     *
     * @param name Merchant name or part of it
     * @return Response with the merchant list found
     */
    @GetMapping("/search")
    public ResponseEntity<List<MerchantOutputDTO>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(merchantService.findByName(name).stream().map(merchantMapper::toDTO).collect(Collectors.toList()));
    }

    /**
     * Update a merchant
     *
     * @param id Merchant id
     * @param merchantInputDTO Merchant data
     * @return Response with the updated merchant
     */
    @PutMapping("/{id}")
    public ResponseEntity<MerchantOutputDTO> updateMerchant(@PathVariable String id, @Valid @RequestBody MerchantInputDTO merchantInputDTO) {
        return ResponseEntity.ok(merchantMapper.toDTO(merchantService.updateMerchant(id, merchantInputDTO)));
    }

    /**
     * Find merchants that belong to a client
     *
     * @param clientId Client id
     * @return Response with the merchant list found
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<MerchantOutputDTO>> findByClient(@PathVariable String clientId) {
        return ResponseEntity.ok(merchantService.findByClient(clientId).stream().map(merchantMapper::toDTO).collect(Collectors.toList()));
    }
}
