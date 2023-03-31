package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "basket")
public class Basket {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "basket_item", joinColumns = @JoinColumn(name = "basket_id"))
    private List<BasketItem> basket;

}