package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String username;

    @Column(name = "password")
    private String password;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "roles")
    private Role roles;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "details_id")
    private UserDetails details;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "orders_id")
    private Order historyOrder;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "baskets_id")
    private Basket basket;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "liked_id")
    private Liked liked;
}