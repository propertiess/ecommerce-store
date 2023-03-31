package com.example.server.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "img")
    private String img;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private Category category;

}