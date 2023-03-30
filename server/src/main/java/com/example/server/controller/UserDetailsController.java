package com.example.server.controller;

import com.example.server.model.UserDetails;
import com.example.server.model.UserInfo;
import com.example.server.service.userInfo.UserInfoRepository;
import com.example.server.service.userdetails.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
        Optional<UserDetails> UserDetails = userDetailsRepository.findById(id);
        return UserDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Создание описания пользователя
    @PostMapping("/{userId}")
    public ResponseEntity<UserDetails> createUserDescription(@PathVariable Long userId, @RequestBody UserDetails UserDetails) {
        UserInfo userInfo = userRepository.findById(userId);
        if (userInfo != null) {
            UserDetails.setUser(userInfo);
            UserDetails savedUserDescription = userDetailsRepository.save(UserDetails);
            return ResponseEntity.ok(savedUserDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Обновление описания пользователя по id
    @PutMapping("/{id}")
    public ResponseEntity<UserDetails> updateUserDescription(@PathVariable Long id, @RequestBody UserDetails UserDetails) {
        Optional<UserDetails> existingUserDescription = userDetailsRepository.findById(id);
        if (existingUserDescription.isPresent()) {
            UserDetails savedUserDescription = existingUserDescription.get();
            savedUserDescription.setInterests(UserDetails.getInterests());
            savedUserDescription.setHobbies(UserDetails.getHobbies());
            savedUserDescription.setProfession(UserDetails.getProfession());
            UserDetails updatedUserDescription = userDetailsRepository.save(savedUserDescription);
            return ResponseEntity.ok(updatedUserDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Удаление описания пользователя по id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserDescription(@PathVariable Long id) {
        userDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
