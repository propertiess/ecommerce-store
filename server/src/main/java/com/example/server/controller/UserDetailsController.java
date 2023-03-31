package com.example.server.controller;

import com.example.server.model.UserDetails;
import com.example.server.model.UserInfo;
import com.example.server.service.userInfo.UserInfoRepository;
import com.example.server.service.userdetails.UserDetailsRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users/details")
public class UserDetailsController {

    private final UserDetailsRepository userDetailsRepository;
    private final UserInfoRepository userRepository;

    @Autowired
    public UserDetailsController(UserDetailsRepository userDetailsRepository, UserInfoRepository userRepository) {
        this.userDetailsRepository = userDetailsRepository;
        this.userRepository = userRepository;
    }

    // Получение описания пользователя по id
    @GetMapping("/{id}")
    public ResponseEntity<UserDetails> getUserDescriptionById(@PathVariable Long id) {
        Optional<UserDetails> UserDetails = userDetailsRepository.findById(Math.toIntExact(id));
        return UserDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Создание описания пользователя
    @PostMapping("/{userId}")
    public ResponseEntity<UserDetails> createUserDescription(@PathVariable Long userId, @RequestBody UserDetails userDetailsRequest) {
        UserInfo userInfo = userRepository.findById(userId);
        if (userInfo != null) {
            UserDetails userDetails = new UserDetails();
            userDetails.setUserId(userId);
            userDetails.setFirstName(userDetailsRequest.getFirstName());
            userDetails.setLastName(userDetailsRequest.getLastName());
            userDetails.setEmail(userDetailsRequest.getEmail());
            userDetails.setPhone(userDetailsRequest.getPhone());

            userInfo.setDetails(userDetails);
            userRepository.save(userInfo);


            UserDetails savedUserDescription = userDetailsRepository.save(userDetails);
            return ResponseEntity.ok(savedUserDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}