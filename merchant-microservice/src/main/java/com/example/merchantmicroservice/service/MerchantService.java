package com.example.merchantmicroservice.service;

import com.example.merchantmicroservice.mappers.MerchantMapper;
import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantRequest;
import com.example.merchantmicroservice.model.dto.MerchantResponse;
import com.example.merchantmicroservice.repository.MerchantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MerchantService {

    private final MerchantRepository merchantRepository;
    private final MerchantMapper merchantMapper;

    public MerchantResponse createMerchant(MerchantRequest merchantRequest) {
        Merchant merchant = merchantMapper.toEntity(merchantRequest);
        merchantRepository.create(merchant);
        return merchantMapper.toResponse(merchant);
    }

    public MerchantResponse findById(String id, boolean simpleOutput) {
        return merchantRepository.findById(id)
                .map(merchant -> simpleOutput ? new MerchantResponse(merchant.getId(), null, null, null) : merchantMapper.toResponse(merchant))
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
    }

    public List<MerchantResponse> findByName(String name) {
        return merchantRepository.findByName(name)
                .stream()
                .map(merchantMapper::toResponse)
                .collect(Collectors.toList());
    }

    public MerchantResponse updateMerchant(String id, MerchantRequest merchantRequest) {
        Merchant merchant = merchantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
        merchantMapper.updateEntity(merchantRequest, merchant);
        merchantRepository.updateMerchant(merchant);
        return merchantMapper.toResponse(merchant);
    }
}