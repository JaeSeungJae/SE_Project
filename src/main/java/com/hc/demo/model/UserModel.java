package com.hc.demo.model;

import com.hc.demo.container.User;
import com.hc.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserModel {
    @Autowired
    UserService userService;


    public User getUser() {
        User user = userService.getUser();
        //전처리 또는 로직
        return user;
    }

    public User loginUser(String id, String password, HttpSession hs) {
        User user = userService.getUserLogin(id, password);
        if(user != null) {
            hs.setAttribute("Logged",true);
            hs.setAttribute("User",user);
        }
        return user;
    }

    public int registerUser(String ID, String PW, String Name, String Nickname) {
        return userService.registerUserInfo(ID, PW, Name, Nickname);
    }

}
