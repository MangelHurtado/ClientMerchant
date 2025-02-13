package com.example.merchantmicroservice.model.dto;

import com.example.merchantmicroservice.model.MerchantType;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor
public class MerchantRequest {
    @NotBlank(message = "El nombre del comercio no puede estar vacío")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private final String name;

    @NotBlank(message = "La dirección no puede estar vacía")
    @Size(max = 255, message = "La dirección no puede tener más de 255 caracteres")
    private final String address;

    @NotNull(message = "El tipo de comercio es obligatorio")
    private final MerchantType merchantType;
}

