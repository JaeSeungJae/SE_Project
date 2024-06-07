package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.hc.demo.container.Article;
import com.hc.demo.container.Pair;
import com.hc.demo.container.User;
import com.hc.demo.container.Comment;
import com.hc.demo.model.BoardArticleModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
        // 5. 게시글 조회수 1 증가
        // 5. result-> addproperty , article-> add , comments-> add == return
        if(boardArticleModel.incrementHits(article_uid) == 0) {
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        jo.add("article",article_pair.getFirst());
        jo.add("comments", article_pair.getSecond());
        return jo.toString();
    }

    @PostMapping("/rest/writeArticle")
    public String writeArticle(HttpServletRequest req, @RequestBody HashMap<String, Object> body) {
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        JsonObject jo = new JsonObject();
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
//        if (boardArticleModel.writeArticle(((User)hs.getAttribute("User")).getUid(), (int)body.get("board_uid"), (String)body.get("title"), (String)body.get("content")) == 0) {
//            jo.addProperty("result", "failed");
//            return jo.toString();
//        }
        try {
            boardArticleModel.writeArticle(((User)hs.getAttribute("User")).getUid(), (int)body.get("board_uid"), (String)body.get("title"), (String)body.get("content"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        return jo.toString();
    }

    @PostMapping("/rest/deleteArticle")
    public String deleteArticle(HttpServletRequest req, @RequestBody HashMap<String,Object> body)
    {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        User user = (User)hs.getAttribute("User");
        Article article = boardArticleModel.getArticle((int)body.get("article_uid"));
        try {
            if(article!=null && article.getMember_uid()==user.getUid())
            {
                boardArticleModel.DeleteArticle(article.getUid());
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

    @PostMapping("/rest/deleteComment")
    public String deleteComment(HttpServletRequest req, @RequestBody HashMap<String,Object> body)
    {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        User user = (User)hs.getAttribute("User");
        Comment comment = boardArticleModel.getComment((int)body.get("cmt_uid"));
        try {
            if(comment!=null && comment.getUser_uid()==user.getUid())
            {
                boardArticleModel.DeleteComment(comment.getUid());
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

}
