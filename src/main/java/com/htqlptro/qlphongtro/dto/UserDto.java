package com.htqlptro.qlphongtro.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String role;
    private Long tenantId;      // ✅ Thêm dòng này
    private String fullName;    // ✅ (tùy chọn) nếu cần hiển thị tên
    private String email;       // ✅ (tùy chọn)
}
