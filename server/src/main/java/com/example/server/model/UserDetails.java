package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_details")
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String interests;
    private String hobbies;
    private String profession;

    @OneToOne(mappedBy = "details")
    private UserInfo user;
}
