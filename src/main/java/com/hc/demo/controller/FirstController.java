package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.User;
import com.hc.demo.model.UserModel;
import com.hc.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class FirstController {
    @Autowired
    UserModel userModel;
    @GetMapping("/")
    public String firstcont(HttpServletRequest req) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();

        if(hs!=null && hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged") == true) {
            JsonObject jo2 = new JsonObject();
            User user = (User)hs.getAttribute("User");
            jo2.addProperty("username",user.getName());
            jo2.addProperty("id",user.getID());
            jo.addProperty("logged",true);
            jo.add("userinfo",jo2);
        }

        jo.addProperty("res","success");
        return jo.toString();
    }

    @PostMapping("/login")
    public String login(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        HttpSession hs = req.getSession(true);
        JsonObject jo = new JsonObject();
        if(userModel.loginUser((String)body.get("id"),(String)body.get("password"),hs) != null)
            jo.addProperty("res","success");
        else
            jo.addProperty("res","failed");

        return jo.toString();
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest req) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();

        hs.invalidate();
        jo.addProperty("res","success");
        return jo.toString();
    }



}
