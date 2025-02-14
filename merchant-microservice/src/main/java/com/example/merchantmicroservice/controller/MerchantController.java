package com.example.merchantmicroservice.controller;

import com.example.merchantmicroservice.model.dto.MerchantInputDTO;
import com.example.merchantmicroservice.model.dto.MerchantOutputDTO;
import com.example.merchantmicroservice.service.MerchantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/merchant")
@RequiredArgsConstructor
public class MerchantController {

    private final MerchantService merchantService;

    @PostMapping
    public ResponseEntity<MerchantOutputDTO> createMerchant(@Valid @RequestBody MerchantInputDTO merchantInputDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(merchantService.createMerchant(merchantInputDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MerchantOutputDTO> findById(@PathVariable String id, @RequestParam(required = false, defaultValue = "false") boolean simpleOutput) {
        return ResponseEntity.ok(merchantService.findById(id, simpleOutput));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MerchantOutputDTO>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(merchantService.findByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MerchantOutputDTO> updateMerchant(@PathVariable String id, @Valid @RequestBody MerchantInputDTO merchantInputDTO) {
        return ResponseEntity.ok(merchantService.updateMerchant(id, merchantInputDTO));
    }
}
