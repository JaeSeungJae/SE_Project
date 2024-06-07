package com.hc.demo.model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.Pair;
import com.hc.demo.service.BoardArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class BoardArticleModel {
    @Autowired
    BoardArticleService boardArticleService;

//    public List<BoardArticle> getBoardArticleList(int board_uid) {
//        return boardArticleService.getBoardArticleList(board_uid);
//    }

    public List<Map<String,Object>> getBoardArticleList(int board_uid) {
        return boardArticleService.getBoardArticleList(board_uid);
    }

    public Pair<JsonObject,JsonArray> getArticleAndComments(int article_uid) throws Exception {
        // 1. article_uid를 이용하여 게시글 불러오기
        HashMap<String, Object> articleInfo = boardArticleService.getArticleInfo(article_uid);
//        System.out.println(articleInfo.keySet());
        // 3. article 정보를 하나의 jsonobject article_jo에 저장
        JsonObject item = new JsonObject();
        item.addProperty("article_uid", articleInfo.get("uid").toString());
        item.addProperty("user_nickname", articleInfo.get("nickname").toString());
        item.addProperty("title", articleInfo.get("title").toString());
        item.addProperty("content", articleInfo.get("content").toString());
        item.addProperty("hits", articleInfo.get("hits").toString());
        item.addProperty("created_date", articleInfo.get("created_date").toString());


        // 2. article_uid를 이용하여 댓글 배열 불러오기
        List<HashMap<String, Object>> comments = boardArticleService.getComments(article_uid);
        // 4. 댓글 정보를 for문 돌면서 jsonarray ja에 저장
        JsonArray ja = new JsonArray();
        for (HashMap<String,Object> comment : comments) {
            JsonObject comment_obj = new JsonObject();
            comment_obj.addProperty("comment_uid", comment.get("uid").toString());
            comment_obj.addProperty("user_nickname", comment.get("nickname").toString());
            comment_obj.addProperty("content", comment.get("comment").toString());
            comment_obj.addProperty("created_date", comment.get("created_date").toString());
            ja.add(comment_obj);
        }
        Pair<JsonObject,JsonArray> result = new Pair<JsonObject,JsonArray>(item,ja);
        return result;
    }
}
