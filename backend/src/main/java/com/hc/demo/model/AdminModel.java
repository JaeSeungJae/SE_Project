package com.hc.demo.model;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.Article;
import com.hc.demo.container.Comment;
import com.hc.demo.container.Pair;
import com.hc.demo.container.User;
import com.hc.demo.service.BoardArticleService;
import com.hc.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AdminModel {
    @Autowired
    AdminService adminService;



    public List<Map<String,Object>> getUserList() {
        return adminService.getUserList();
    }



}
