package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "basketId")
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "total_price")
    private Double totalprice;

}
