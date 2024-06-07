package com.hc.demo.dao;

import com.hc.demo.container.Article;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardArticleDao {
//    List<BoardArticle> getBoardArticleList(int board_uid);
    List<Map<String,Object>> getBoardArticleList(int board_uid);
    Article getArticle(int article_uid);
    int modifyArticle(int article_uid, String title, String content);
}
