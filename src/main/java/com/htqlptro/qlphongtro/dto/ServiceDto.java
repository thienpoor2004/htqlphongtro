package com.htqlptro.qlphongtro.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceDto {
    private Long id;
    private String name;
    private Double price;
    private String unit;
}
