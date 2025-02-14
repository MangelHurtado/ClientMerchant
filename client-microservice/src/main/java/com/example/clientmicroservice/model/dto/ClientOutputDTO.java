package com.example.clientmicroservice.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientOutputDTO {

    private String id;
    private String name;
    private String surname;
    private String cifNifNie;
    private String phone;
    private String email;
}
