package com.example.server.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long productId;
    private Integer quantity;
}
