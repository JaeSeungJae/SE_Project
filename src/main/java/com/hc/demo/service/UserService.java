package com.hc.demo.service;

import com.hc.demo.container.User;
import com.hc.demo.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDao {
    @Autowired
    private UserDao userDao;

    @Override
    public User getUser() {
        return userDao.getUser();
    }
    @Override
    public User getUserLogin(String ID, String PW) {
        return userDao.getUserLogin(ID, PW);
    }

    @Override
    public int registerUserInfo(String ID, String PW, String Name, String Nickname) {
        return userDao.registerUserInfo(ID, PW, Name, Nickname);
    }
}
