package com.example.merchantmicroservice.repository;

import com.example.merchantmicroservice.model.Merchant;

import java.util.List;
import java.util.Optional;

public interface MerchantRepository {
    List<Merchant> findAll();
    Merchant create(Merchant merchant);
    Optional<Merchant> findById(String id);
}
