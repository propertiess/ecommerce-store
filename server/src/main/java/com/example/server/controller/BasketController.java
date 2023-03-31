package com.example.server.controller;

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
    public Object addBasket(@RequestBody Basket orderDto) {
        if (userInfoRepository.existsById(orderDto.getUserId())) {
            UserInfo userInfo = userInfoRepository.findById(orderDto.getUserId());

            List<BasketItem> orderItemDtos = orderDto.getBasket();
            List<BasketItem> orderItems = new ArrayList<>();
            for (BasketItem orderItemDto : orderItemDtos) {
                if (!cardRepository.existsById(orderItemDto.getProductId())) {
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет продукта " + orderItemDto.getProductId());
                }
                BasketItem orderItem = new BasketItem();
                orderItem.setProductId(orderItemDto.getProductId());
                orderItem.setQuantity(orderItemDto.getQuantity());
                orderItems.add(orderItem);
            }

            Basket basket = new Basket();
            basket.setUserId((long) userInfo.getId());
            basket.setBasket(orderItems);
            basketRepository.save(basket);
            userInfo.setBasket(basket);
            userInfoRepository.save(userInfo);

            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь с id "+orderDto.getUserId()+" не найден" );
        }
    }

    @GetMapping("/{orderId}")
    public Object getBasketById(@PathVariable Long orderId) {
        Optional<com.example.server.model.Basket> orderOptional = basketRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            com.example.server.model.Basket Basket = orderOptional.get();
            return new ResponseEntity<>(Basket, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }

    @PutMapping("/{id}")
    public Object updateBasket(@PathVariable Long id, @RequestBody Basket orderDto) {
        if (basketRepository.existsById(id)) {
            Basket basket = basketRepository.findById(id).orElseThrow();
            List<BasketItem> orderItemDtos = orderDto.getBasket();
            List<BasketItem> orderItems = new ArrayList<>();
            for (BasketItem orderItemDto : orderItemDtos) {
                if (!cardRepository.existsById(orderItemDto.getProductId())) {
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет продукта " + orderItemDto.getProductId());
                }
                BasketItem orderItem = new BasketItem();
                orderItem.setProductId(orderItemDto.getProductId());
                orderItem.setQuantity(orderItemDto.getQuantity());
                orderItems.add(orderItem);
            }

            basket.setBasket(orderItems);
            basketRepository.save(basket);
            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет заказа " + id);
        }
    }

    @DeleteMapping("/{orderId}")
    public Object deleteBasket(@PathVariable Long orderId) {
        Optional<Basket> orderOptional = basketRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            basketRepository.deleteById(orderId);
            return new ResponseEntity<>(orderId, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Заказ с id " + orderId + " не найден");
        }
    }
}
