package com.hc.demo.dao;

import com.hc.demo.container.Article;
import com.hc.demo.container.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface BoardArticleDao {
    List<Map<String,Object>> getBoardArticleList(int board_uid);

    Article getArticle(int article_uid);
    int modifyArticle(int article_uid, String title, String content);


    HashMap<String, Object> getArticleInfo(int article_uid);
    List<HashMap<String, Object>> getComments(int article_uid);

    int incrementHits(int article_uid);

    int writeArticle(int uid, int board_uid, String title, String content);


    int DeleteArticle(int article_uid);

    Comment getComment(int comment_uid);

    int DeleteComment(int comment_uid);

    int writeComment(int uid, int article_uid, String comment);

    int updateComment(int uid, String comment);

}
