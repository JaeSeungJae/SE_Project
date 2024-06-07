package com.hc.demo.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface BoardArticleDao {
    List<Map<String,Object>> getBoardArticleList(int board_uid);

    HashMap<String, Object> getArticleInfo(int article_uid);
    List<HashMap<String, Object>> getComments(int article_uid);

    int incrementHits(int article_uid);

    int writeArticle(int uid, int board_uid, String title, String content);
}
