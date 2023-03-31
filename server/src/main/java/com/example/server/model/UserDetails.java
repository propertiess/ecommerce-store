package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_details")
public class UserDetails {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

}
