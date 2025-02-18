package com.example.merchantmicroservice.service;

import com.example.merchantmicroservice.mappers.MerchantMapper;
import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantInputDTO;
import com.example.merchantmicroservice.model.dto.MerchantOutputDTO;
import com.example.merchantmicroservice.repository.MerchantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MerchantService {

    private final MerchantRepository merchantRepository;
    private final MerchantMapper merchantMapper;

    public MerchantOutputDTO createMerchant(MerchantInputDTO merchantInputDTO) {
        Merchant merchant = merchantMapper.toEntity(merchantInputDTO);

        if (merchant.getPartitionKey() == null) {
            merchant.setId(UUID.randomUUID().toString());
        }

        merchantRepository.create(merchant);
        return merchantMapper.toDTO(merchant);
    }


    public MerchantOutputDTO findById(String id, boolean simpleOutput) {
        return merchantRepository.findById(id)
                .map(merchant -> simpleOutput ? new MerchantOutputDTO(merchant.getId(), null, null, null, null) : merchantMapper.toDTO(merchant))
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
    }

    public List<MerchantOutputDTO> findByName(String name) {
        List<Merchant> merchants = merchantRepository.findByName(name);
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found with the given name");
        }
        return merchants.stream()
                .map(merchantMapper::toDTO)
                .collect(Collectors.toList());
    }

    public MerchantOutputDTO updateMerchant(String id, MerchantInputDTO merchantRequest) {
        Merchant merchant = merchantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
        merchantMapper.updateEntity(merchantRequest, merchant);
        merchantRepository.updateMerchant(merchant);
        return merchantMapper.toDTO(merchant);
    }

    public List<MerchantOutputDTO> findByClient(String clientId) {
        List<Merchant> merchants = merchantRepository.findByClient(clientId);
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found for the given client");
        }
        return merchants.stream()
                .map(merchantMapper::toDTO)
                .collect(Collectors.toList());
    }
}