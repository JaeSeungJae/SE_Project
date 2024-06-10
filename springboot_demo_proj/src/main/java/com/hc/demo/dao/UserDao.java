package com.hc.demo.dao;

import com.hc.demo.container.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    User getUser();
    User getUserLogin(String ID, String PW);
    int registerUserInfo(String ID, String PW, String Name, String Nickname);
    int deleteUserInfo(int uid);
    int modifyUserInfo(int uid, String PW, String Name, String Nickname);
}
