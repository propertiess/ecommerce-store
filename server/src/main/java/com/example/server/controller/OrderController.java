package com.example.server.controller;

import com.example.server.model.OrderItem;
import com.example.server.model.Order;
import com.example.server.model.UserInfo;
import com.example.server.service.order.OrderRepository;
import com.example.server.service.userInfo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private final UserInfoRepository userInfoRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public OrderController(UserInfoRepository userInfoRepository, OrderRepository orderRepository) {
        this.userInfoRepository = userInfoRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping()
    public Object addBasket(@RequestBody Order orderDto) {
        if (userInfoRepository.existsById(orderDto.getUserId())) {
            UserInfo userInfo = userInfoRepository.findById(orderDto.getUserId());

            List<OrderItem> orderItemDtos = orderDto.getOrder();
            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItem orderItemDto : orderItemDtos) {
                OrderItem orderItem = new OrderItem();
                orderItem.setId(orderItemDto.getId());
                orderItem.setStatus(orderItemDto.getStatus());
                orderItem.setTotalPrice(orderItemDto.getTotalPrice());
                orderItems.add(orderItem);
            }

            Order order = new Order();
            order.setUserId((long) userInfo.getId());
            order.setOrder(orderItems);
            orderRepository.save(order);
            userInfo.setHistoryOrder(order);
            userInfoRepository.save(userInfo);

            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь с id "+orderDto.getUserId()+" не найден" );
        }
    }

    @GetMapping("/{orderId}")
    public Object getBasketById(@PathVariable Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }

    @PutMapping("/{id}")
    public Object updateBasket(@PathVariable Long id, @RequestBody Order orderDto) {
        if (orderRepository.existsById(id)) {
            Order order = orderRepository.findById(id).orElseThrow();
            List<OrderItem> orderItemDtos = orderDto.getOrder();
            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItem orderItemDto : orderItemDtos) {
                OrderItem orderItem = new OrderItem();
                orderItem.setId(orderItemDto.getId());
                orderItem.setStatus(orderItemDto.getStatus());
                orderItem.setTotalPrice(orderItemDto.getTotalPrice());
                orderItems.add(orderItem);
            }
            order.setOrder(orderItems);
            orderRepository.save(order);

            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет заказа " + id);
        }
    }

    @DeleteMapping("/{orderId}")
    public Object deleteBasket(@PathVariable Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            orderRepository.deleteById(orderId);
            return new ResponseEntity<>(orderId, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }
}