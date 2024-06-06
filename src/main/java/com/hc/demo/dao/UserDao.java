package com.hc.demo.dao;

import com.hc.demo.container.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    User getUser();
    User getUserLogin(String id, String password);
}
