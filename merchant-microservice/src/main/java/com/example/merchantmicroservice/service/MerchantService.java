package com.example.merchantmicroservice.service;

import com.example.merchantmicroservice.mappers.MerchantMapper;
import com.example.merchantmicroservice.model.Merchant;
import com.example.merchantmicroservice.model.dto.MerchantInputDTO;
import com.example.merchantmicroservice.repository.MerchantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

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
    public Merchant createMerchant(MerchantInputDTO merchantInputDTO) {
        Merchant merchant = merchantMapper.toEntity(merchantInputDTO);

        if (merchant.getPartitionKey() == null) {
            merchant.setId(UUID.randomUUID().toString());
        }

        merchantRepository.create(merchant);
        return merchant;
    }


    /**
     * Find a merchant by id
     *
     * @param id Merchant id
     * @param simpleOutput If true, only the id will be returned
     * @return The merchant
     * @throws NoSuchElementException If the merchant is not found
     */
    public Merchant findById(String id, boolean simpleOutput) {
        Merchant merchant = merchantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));

        if (simpleOutput) {
            Merchant voidMerchant = new Merchant();
            voidMerchant.setId(merchant.getId());
            return voidMerchant;
        }
        return merchant;
    }

    /**
     * Find a merchant by name or part of it
     *
     * @param name Merchant name or part of it
     * @return The list of merchants found
     * @throws NoSuchElementException If no merchants are found
     */
    public List<Merchant> findByName(String name) {
        List<Merchant> merchants = merchantRepository.findByName(name);
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found with the given name");
        }
        return merchants;
    }

    /**
     * Update a merchant
     *
     * @param id Merchant id
     * @param merchantRequest Merchant data
     * @return The updated merchant
     * @throws NoSuchElementException If the merchant is not found
     */
    public Merchant updateMerchant(String id, MerchantInputDTO merchantRequest) {
        Merchant merchant = merchantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Merchant not found"));
        merchantMapper.updateEntity(merchantRequest, merchant);
        merchantRepository.updateMerchant(merchant);
        return merchant;
    }

    /**
     * Find merchants that belong to a client
     *
     * @param clientId Client id
     * @return The list of merchants found
     * @throws NoSuchElementException If no merchants are found
     */
    public List<Merchant> findByClient(String clientId) {
        List<Merchant> merchants = merchantRepository.findByClient(clientId);
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found for the given client");
        }
        return merchants;
    }

    /**
     * Find all merchants
     *
     * @return The list of merchants found
     * @throws NoSuchElementException If no merchants are found
     */
    public List<Merchant> findAll() {
        List<Merchant> merchants = merchantRepository.findAll();
        if (merchants.isEmpty()) {
            throw new NoSuchElementException("No merchants found");
        }
        return merchants;
    }
}