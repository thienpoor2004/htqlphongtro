package com.htqlptro.qlphongtro.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private Long id;
    private String roomNumber;
    private String status;
    private Double price;
    private Integer capacity;
}
