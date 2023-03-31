package com.example.server.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LikedItem {
    private Long productId;
}
