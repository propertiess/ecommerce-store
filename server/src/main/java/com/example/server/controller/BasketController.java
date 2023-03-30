package com.example.server.controller;

import com.example.server.dto.OrderDto;
import com.example.server.dto.OrderItemDto;
import com.example.server.model.Basket;
import com.example.server.model.BasketItem;
import com.example.server.model.UserInfo;
import com.example.server.service.card.CardRepository;
import com.example.server.service.order.BasketRepository;
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
@RequestMapping("/api/v1/basket")
public class BasketController {

    private final UserInfoRepository userInfoRepository;
    private final CardRepository cardRepository;
    private final BasketRepository basketRepository;

    @Autowired
    public BasketController(UserInfoRepository infoRepository, CardRepository cardRepository, BasketRepository basketRepository) {
        this.userInfoRepository = infoRepository;
        this.cardRepository = cardRepository;
        this.basketRepository = basketRepository;
    }

    @PostMapping()
    public Object addOrder(@RequestBody OrderDto orderDto) {
        if (userInfoRepository.existsById(orderDto.getUserId())) {
            UserInfo userInfo = userInfoRepository.findById(orderDto.getUserId());

            List<OrderItemDto> orderItemDtos = orderDto.getOrder();
            List<BasketItem> orderItems = new ArrayList<>();
            for (OrderItemDto orderItemDto : orderItemDtos) {
                if (!cardRepository.existsById(orderItemDto.getProductId())) {
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет продукта " + orderItemDto.getProductId());
                }
                BasketItem orderItem = new BasketItem();
                orderItem.setProductId(orderItemDto.getProductId());
                orderItem.setQuantity(orderItemDto.getQuantity());
                orderItems.add(orderItem);
            }

            Basket Basket = new Basket();
            Basket.setId((long) userInfo.getId());
            Basket.setUserId((long) userInfo.getId());
            Basket.setOrder(orderItems);
            basketRepository.save(Basket);

            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь с id "+orderDto.getUserId()+" не найден" );
        }
    }

    @GetMapping("/{orderId}")
    public Object getOrder(@PathVariable Long orderId) {
        Optional<Basket> orderOptional = basketRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Basket Basket = orderOptional.get();
            return new ResponseEntity<>(Basket, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }

    @PutMapping("/{id}")
    public Object updateOrder(@PathVariable Long id, @RequestBody OrderDto orderDto) {
        if (basketRepository.existsById(id)) {
            Basket Basket = basketRepository.findById(id).orElseThrow();
            List<OrderItemDto> orderItemDtos = orderDto.getOrder();
            List<BasketItem> orderItems = new ArrayList<>();
            for (OrderItemDto orderItemDto : orderItemDtos) {
                if (!cardRepository.existsById(orderItemDto.getProductId())) {
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет продукта " + orderItemDto.getProductId());
                }
                BasketItem orderItem = new BasketItem();
                orderItem.setProductId(orderItemDto.getProductId());
                orderItem.setQuantity(orderItemDto.getQuantity());
                orderItems.add(orderItem);
            }
            Basket.setOrder(orderItems);
            basketRepository.save(Basket);
            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет заказа " + id);
        }
    }

    @DeleteMapping("/{orderId}")
    public Object deleteOrder(@PathVariable Long orderId) {
        Optional<Basket> orderOptional = basketRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            basketRepository.deleteById(orderId);
            return new ResponseEntity<>(orderId, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }
}
