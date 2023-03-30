package com.example.server.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class BasketItem {
    private Long productId;
    private Integer quantity;
}
