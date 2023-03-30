package com.example.server.controller;

import com.example.server.model.Order;
import com.example.server.model.UserDetails;
import com.example.server.model.Basket;
import com.example.server.service.order.BasketRepository;
import com.example.server.service.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/basket/order")
public class OrderController {

    private final OrderRepository orderRepository;
    private final BasketRepository basketRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository, BasketRepository basketRepository) {
        this.orderRepository = orderRepository;
        this.basketRepository = basketRepository;
    }

    // Получение описания пользователя по id
    @GetMapping("/{id}")
    public ResponseEntity<Order> getUserDescriptionById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Создание описания пользователя
    @PostMapping("/{userId}")
    public ResponseEntity<Order> createUserDescription(@PathVariable Long userId, @RequestBody Order orderDto) {
        Basket basket = basketRepository.findById(userId).get();
        if (basket!= null) {
            Order order = new Order();
            order.setId(userId);
            order.setStatus(orderDto.getStatus());
            order.setTotalprice(orderDto.getTotalprice());

            basket.setOrder(order);
            basketRepository.save(basket);


            Order savedUserDescription = orderRepository.save(order);
            return ResponseEntity.ok(savedUserDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
