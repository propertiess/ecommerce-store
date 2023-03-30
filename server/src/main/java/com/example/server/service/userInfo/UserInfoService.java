package com.example.server.service.userInfo;


import com.example.server.model.UserInfo;

import java.util.List;

public interface UserInfoService {
    UserInfo findUserInfoById(Long id);
    List<UserInfo> findAllUserInfo();
    UserInfo addUserInfo(UserInfo existingUser);
    void deleteUserInfo(UserInfo user);
    boolean existsByUsername(String username);
}

