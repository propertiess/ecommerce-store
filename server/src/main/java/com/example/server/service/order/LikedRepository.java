package com.example.server.service.order;


import com.example.server.model.Liked;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedRepository extends JpaRepository<Liked, Long> {
}