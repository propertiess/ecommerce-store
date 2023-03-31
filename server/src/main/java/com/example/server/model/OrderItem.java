package com.example.server.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class OrderItem {
    private Long id;
    private String status;
    private Double totalPrice;
}