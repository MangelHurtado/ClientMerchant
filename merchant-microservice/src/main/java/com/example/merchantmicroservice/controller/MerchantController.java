package com.example.merchantmicroservice.controller;

import com.example.merchantmicroservice.model.dto.MerchantRequest;
import com.example.merchantmicroservice.model.dto.MerchantResponse;
import com.example.merchantmicroservice.service.MerchantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/merchants")
public class MerchantController {

    private final MerchantService merchantService;

    public MerchantController(MerchantService merchantService) { this.merchantService = merchantService; }

    @PostMapping
    public ResponseEntity<MerchantResponse> createMerchant(@Valid @RequestBody MerchantRequest merchantRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(merchantService.createMerchant(merchantRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MerchantResponse> findById(@PathVariable String id,
                                                     @RequestParam(required = false, defaultValue = "false") boolean simpleOutput) {
        return ResponseEntity.ok(merchantService.findById(id, simpleOutput));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MerchantResponse>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(merchantService.findByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MerchantResponse> updateMerchant(@PathVariable String id,
                                                           @Valid @RequestBody MerchantRequest merchantRequest) {
        return ResponseEntity.ok(merchantService.updateMerchant(id, merchantRequest));
    }
}
