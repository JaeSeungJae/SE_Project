package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.Article;
import com.hc.demo.container.User;
import com.hc.demo.model.BoardArticleModel;
import com.hc.demo.model.UserModel;
import com.hc.demo.model.AdminModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AdminController {
    @Autowired
    AdminModel adminModel;
    @Autowired
    BoardArticleModel boardArticleModel;
    @Autowired
    UserModel userModel;

    @GetMapping("/rest/getUserList")
    public String getUserList(HttpServletRequest req) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        User user = (User)hs.getAttribute("User");

        if(hs!=null && hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged") && user.getLevel() == 1) {
            try {

                List<Map<String,Object>> Users = adminModel.getUserList();

                for (Map<String,Object> user_info : Users) {

                    JsonObject item = new JsonObject();
                    item.addProperty("id", user_info.get("id").toString());
                    item.addProperty("pw", user_info.get("pw").toString());
                    item.addProperty("name", user_info.get("name").toString());
                    item.addProperty("nickname", user_info.get("nickname").toString());
                    ja.add(item);
                }

                jo.addProperty("result", "success");
                jo.add("data", ja);
                return jo.toString();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                jo.addProperty("result", "failed");
//            jo.add("data", ja);
                return jo.toString();
            }
        }
        else {

            jo.addProperty("result", "failed");

        }

        return jo.toString();
    }

    @PostMapping("/rest/deleteArticle_admin")
    public String deleteArticle_admin(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        User user = (User)hs.getAttribute("User");
        Article article = boardArticleModel.getArticle((int)body.get("article_uid"));

        if(hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged") && user.getLevel() == 1) {
            try{
                boardArticleModel.DeleteArticle(article.getUid());
                jo.addProperty("result", "success");
                return jo.toString();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                jo.addProperty("result", "failed");
                return jo.toString();
            }
        }
        else {
            jo.addProperty("result", "failed");
        }
        return jo.toString();
    }

    @PostMapping("/rest/dropMember")
    public String dropMember(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        User user = (User)hs.getAttribute("User");
        if(hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged") && user.getLevel() == 1) {
            try{
                userModel.deleteUser((int)body.get("user_uid"));
                jo.addProperty("result", "success");
                return jo.toString();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                jo.addProperty("result", "failed");
                return jo.toString();
            }
        }
        else {
            jo.addProperty("result", "failed");
        }
        return jo.toString();
    }





}




