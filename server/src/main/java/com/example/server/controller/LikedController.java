package com.example.server.controller;


import com.example.server.model.Liked;
import com.example.server.model.LikedItem;
import com.example.server.model.UserInfo;
import com.example.server.service.card.CardRepository;
import com.example.server.service.order.LikedRepository;
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
@RequestMapping("/api/v1/liked")
public class LikedController {

    private final UserInfoRepository userInfoRepository;
    private final CardRepository cardRepository;
    private final LikedRepository likedRepository;

    @Autowired
    public LikedController(UserInfoRepository infoRepository, CardRepository cardRepository, LikedRepository likedRepository) {
        this.userInfoRepository = infoRepository;
        this.cardRepository = cardRepository;
        this.likedRepository = likedRepository;
    }

    @PostMapping()
    public Object addLiked(@RequestBody Liked likedDto) {
        if (userInfoRepository.existsById(likedDto.getUserId())) {
            UserInfo userInfo = userInfoRepository.findById(likedDto.getUserId());

            List<LikedItem> likedItemDtos = likedDto.getLiked();
            List<LikedItem> likedItems = new ArrayList<>();
            for (LikedItem orderItemDto : likedItemDtos) {
                if (!cardRepository.existsById(orderItemDto.getProductId())) {
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Нет продукта " + orderItemDto.getProductId());
                }
                LikedItem orderItem = new LikedItem();
                orderItem.setProductId(orderItemDto.getProductId());
                likedItems.add(orderItem);
            }

            Liked liked = new Liked();
            liked.setUserId((long) userInfo.getId());
            liked.setLiked(likedItems);
            
            likedRepository.save(liked);
            userInfo.setLiked(liked);
            userInfoRepository.save(userInfo);

            return new ResponseEntity<>(likedDto, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь с id "+likedDto.getUserId()+" не найден" );
        }
    }

    @GetMapping("/{orderId}")
    public Object getLikedById(@PathVariable Long orderId) {
        Optional<Liked> orderOptional = likedRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Liked liked = orderOptional.get();
            return new ResponseEntity<>(liked, HttpStatus.OK);
        } else {
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Избранные с id " + orderId + " не найден");
        }
    }

}
