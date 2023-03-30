package com.example.server.service.order;

import com.example.server.model.Basket;
import com.example.server.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
