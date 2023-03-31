package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "likeds")
public class Liked {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "liked_item", joinColumns = @JoinColumn(name = "liked_id"))
    private List<LikedItem> liked;
}