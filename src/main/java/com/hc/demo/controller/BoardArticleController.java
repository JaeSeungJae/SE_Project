package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.Pair;
import com.hc.demo.model.BoardArticleModel;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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

    @GetMapping("/rest/getBoardArticle")
    @ResponseBody
    public String getBoardArticle(@RequestParam(value = "article_uid") int article_uid) {
        JsonObject jo = new JsonObject();
        Pair<JsonObject, JsonArray> article_pair = new Pair<JsonObject,JsonArray>();

        try {
//            JsonObject articleInfo = boardArticleModel.getArticleAndComments(article_uid);
            article_pair = boardArticleModel.getArticleAndComments(article_uid);
        } catch (Exception e) {
            jo.addProperty("result", "failed");
            return jo.toString();
//            throw new RuntimeException(e);
        }
        // 1. article_uid를 이용하여 게시글 불러오기
        // 2. article_uid를 이용하여 댓글 배열 불러오기
        // 3. article 정보를 하나의 jsonobject article_jo에 저장
        // 4. 댓글 정보를 for문 돌면서 jsonarray ja에 저장
        // 5. result-> addproperty , article-> add , comments-> add == return
        jo.addProperty("result", "success");
        jo.add("article",article_pair.getFirst());
        jo.add("comments", article_pair.getSecond());
        return jo.toString();
    }


}
