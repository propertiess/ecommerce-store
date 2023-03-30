package com.example.server.controller;

import com.example.server.dto.RegisterDto;
import com.example.server.model.Role;
import com.example.server.model.UserInfo;
import com.example.server.service.UserService;
import com.example.server.service.userInfo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final UserInfoRepository userInfoRepository;
    private final UserService passwordEncoder;

    @Autowired
    public AuthController(UserInfoRepository userInfoRepository, UserService passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public Object register(@RequestBody RegisterDto registerDto) {
        if (userInfoRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseStatusException(HttpStatus.BAD_REQUEST, "Пользователь существует");
        }
        UserInfo user = new UserInfo();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encodePassword((registerDto.getPassword())));
        user.setRoles(Role.USER);
        userInfoRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody UserInfo loginDto) {
        Optional<UserInfo> savedUser = userInfoRepository.findUserInfoByUsername(loginDto.getUsername());
        if (savedUser.isPresent()) {
            if (passwordEncoder.matches(loginDto.getPassword(), savedUser.get().getPassword()) && loginDto.getUsername().equals(savedUser.get().getUsername())) {
                return ResponseEntity.ok(savedUser.get());
            } else if (!(passwordEncoder.matches(loginDto.getPassword(), savedUser.get().getPassword())) && loginDto.getUsername().equals(savedUser.get().getUsername())){
                return new ResponseStatusException(HttpStatus.BAD_REQUEST, "Неверный логин/пароль");
            }
        }
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не существует");
    }
    
}

