package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.model.BoardArticleModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BoardArticleController {

    @Autowired
    BoardArticleModel boardArticleModel;

    @GetMapping("/rest/getBoardArticleList")
    @ResponseBody
    public String getArticles(@RequestParam(value = "board_uid") int board_uid) {
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        List<Map<String,Object>>articles = boardArticleModel.getBoardArticleList(board_uid);
        for(Map<String,Object> article :articles) {
            JsonObject item = new JsonObject();
            item.addProperty("article_uid", article.get(uid));
            item.addProperty("title");
            item.addProperty("user_nickname");
            item.addProperty("created_date");
            item.addProperty("hits");
        }

    }


}
