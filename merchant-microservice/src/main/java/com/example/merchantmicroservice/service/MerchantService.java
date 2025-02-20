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

    /**
     * Create a new merchant
     *
     * @param merchantInputDTO Merchant data
     * @return The created merchant
     */
    public MerchantOutputDTO createMerchant(MerchantInputDTO merchantInputDTO) {
        Merchant merchant = merchantMapper.toEntity(merchantInputDTO);

        if (merchant.getPartitionKey() == null) {
            merchant.setId(UUID.randomUUID().toString());
        }

        merchantRepository.create(merchant);
        return merchantMapper.toDTO(merchant);
    }


    /**
     * Find a merchant by id
     *
     * @param id Merchant id
     * @param simpleOutput If true, only the id will be returned
     * @return The merchant
     * @throws NoSuchElementException If the merchant is not found
     */
    public MerchantOutputDTO findById(String id, boolean simpleOutput) {
        return merchantRepository.findById(id)
                .map(merchant -> simpleOutput ? new MerchantOutputDTO(merchant.getId(), null, null, null, null) : merchantMapper.toDTO(merchant))
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
    }

    /**
     * Find a merchant by name or part of it
     *
     * @param name Merchant name or part of it
     * @return The list of merchants found
     * @throws NoSuchElementException If no merchants are found
     */
    public List<MerchantOutputDTO> findByName(String name) {
        List<Merchant> merchants = merchantRepository.findByName(name);
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found with the given name");
        }
        return merchants.stream()
                .map(merchantMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update a merchant
     *
     * @param id Merchant id
     * @param merchantRequest Merchant data
     * @return The updated merchant
     * @throws NoSuchElementException If the merchant is not found
     */
    public MerchantOutputDTO updateMerchant(String id, MerchantInputDTO merchantRequest) {
        Merchant merchant = merchantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
        merchantMapper.updateEntity(merchantRequest, merchant);
        merchantRepository.updateMerchant(merchant);
        return merchantMapper.toDTO(merchant);
    }

    /**
     * Find merchants that belong to a client
     *
     * @param clientId Client id
     * @return The list of merchants found
     * @throws NoSuchElementException If no merchants are found
     */
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