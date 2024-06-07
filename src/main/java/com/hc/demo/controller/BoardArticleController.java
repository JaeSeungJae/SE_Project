package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.Article;
import com.hc.demo.container.User;
import com.hc.demo.model.BoardArticleModel;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
public class BoardArticleController {

    private static final Logger log = LoggerFactory.getLogger(BoardArticleController.class);
    @Autowired
    BoardArticleModel boardArticleModel;

    @GetMapping("/rest/getBoardArticleList")
    @ResponseBody
    public String getArticles(@RequestParam(value = "board_uid") int board_uid) {
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        try {
            List<Map<String,Object>> articles = boardArticleModel.getBoardArticleList(board_uid);
//            System.out.println(articles);
            for (Map<String,Object> article : articles) {
                JsonObject item = new JsonObject();
                item.addProperty("article_uid", article.get("uid").toString());
                item.addProperty("title", article.get("title").toString());
                item.addProperty("user_nickname", article.get("Nickname").toString());
                item.addProperty("created_date", article.get("created_date").toString());
                item.addProperty("hits", article.get("hits").toString());
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

    @PostMapping("/rest/updateArticle")
    public String updateArticle(HttpServletRequest req, @RequestBody HashMap<String,Object> body)
    {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        User user = (User)hs.getAttribute("User");
        Article article = boardArticleModel.getArticle((int)body.get("article_uid"));
        try {
            if(article!=null && article.getMember_uid()==user.getUid())
            {
                boardArticleModel.modifyArticle(article.getUid(), (String)body.get("title"), (String)body.get("content"));
                jo.addProperty("result","success");
            }
            else
            {
                jo.addProperty("result", "failed");
            }
            return jo.toString();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
//            jo.add("data", ja);
            return jo.toString();
        }
    }

//    @GetMapping("/rest/")


}
