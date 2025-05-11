// BookingRequest.java
package com.htqlptro.qlphongtro.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    private Long roomId;
    private String checkIn;
    private String checkOut;
}
