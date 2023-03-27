package com.example.crudspringboot.controller;

import com.example.crudspringboot.model.UserInfo;
import com.example.crudspringboot.service.UserService;
import com.example.crudspringboot.service.userInfo.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserInfoController {

    private final UserInfoService userInfoService;
    private final UserService passwordEncoder;

    @Autowired
    public UserInfoController(UserInfoService userInfoService, UserService passwordEncoder) {
        this.userInfoService = userInfoService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping()
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        List<UserInfo> users = userInfoService.findAllUserInfo();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Object getUserById(@PathVariable Long id) {
        UserInfo user = userInfoService.findUserInfoById(id);
        if (user == null) {
            return new ResponseStatusException(HttpStatus.BAD_REQUEST, "Пользователь существует");
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PostMapping()
    public Object createUser(@RequestBody UserInfo requestUser) {

        if (userInfoService.existsByUsername(requestUser.getUsername())) {
            return new ResponseStatusException(HttpStatus.BAD_REQUEST, "Пользователь существует");
        }

        UserInfo user = new UserInfo();
        user.setUsername(requestUser.getUsername());
        user.setPassword(passwordEncoder.encodePassword((requestUser.getPassword())));
        user.setRoles(requestUser.getRoles());

        UserInfo savedUser = userInfoService.addUserInfo(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserInfo user) {
        UserInfo existingUser = userInfoService.findUserInfoById(id);
        if (existingUser == null) {
            return new ResponseEntity<>("Пользователь не найден", HttpStatus.NOT_FOUND);
        } else {
            existingUser.setUsername(user.getUsername());
            existingUser.setRoles(user.getRoles());
            existingUser.setPassword(passwordEncoder.encodePassword((user.getPassword())));
            userInfoService.addUserInfo(existingUser);
            return new ResponseEntity<>("Данные пользователя успешно добавлены", HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        UserInfo user = userInfoService.findUserInfoById(id);
        if (user == null) {
            return new ResponseEntity<>("Пользователь не найден", HttpStatus.NOT_FOUND);
        } else {
            userInfoService.deleteUserInfo(user);
            return new ResponseEntity<>("Пользователь успешно удален", HttpStatus.OK);
        }
    }
}
