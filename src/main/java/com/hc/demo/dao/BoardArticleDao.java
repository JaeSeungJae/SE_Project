package com.hc.demo.dao;

import com.hc.demo.container.Article;
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

}
