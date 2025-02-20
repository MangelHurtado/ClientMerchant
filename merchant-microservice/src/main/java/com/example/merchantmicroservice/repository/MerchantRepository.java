package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;
import java.util.List;
import java.util.Optional;

public interface MerchantRepository {
    Merchant create(Merchant merchant);
    Optional<Merchant> findById(String id);
    List<Merchant> findByName(String name);
    Merchant updateMerchant(Merchant merchant);

    List<Merchant> findByClient(String clientId);
}
