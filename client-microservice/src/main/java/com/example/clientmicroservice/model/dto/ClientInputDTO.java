package com.example.clientmicroservice.model.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientInputDTO {

    @NotBlank(message = "El nombre del cliente no puede estar vacío")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String name;

    @NotBlank(message = "Los apellidos del cliente no pueden estar vacío")
    @Size(max = 100, message = "Los apellidos no pueden tener más de 100 caracteres")
    private String surname;

    @NotBlank(message = "El CIF/NIF/NIE del cliente no puede estar vacío")

    @NotBlank(message = "El CIF/NIF/NIE del cliente no puede estar vacío")
    @Pattern(
            regexp = "^[XYZ]?[0-9]{7,8}[A-Z]$",
            message = "El CIF/NIF/NIE no tiene un formato válido"
    )
    private String cifNifNie;

    @NotBlank(message = "El número de teléfono no puede estar vacío")
    @Pattern(
            regexp = "^(\\+34|0034|34)?[6789]\\d{8}$",
            message = "El número de teléfono no es válido"
    )
    private String phone;

    @NotBlank(message = "El correo electrónico no puede estar vacío")
    @Email(message = "El correo electrónico debe ser válido")
    private String email;
}
