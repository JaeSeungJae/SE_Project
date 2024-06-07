package com.hc.demo.service;

import com.hc.demo.dao.BoardArticleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardArticleService implements BoardArticleDao {
    @Autowired
    private BoardArticleDao boardArticleDao;

    @Override
    public List<Map<String, Object>> getBoardArticleList(int board_uid) {
        return boardArticleDao.getBoardArticleList(board_uid);
    }

    @Override
    public HashMap<String, Object> getArticleInfo(int article_uid) {
        return boardArticleDao.getArticleInfo(article_uid);
    }

    @Override
    public List<HashMap<String, Object>> getComments(int article_uid) {
        return boardArticleDao.getComments(article_uid);
    }

    @Override
    public int incrementHits(int article_uid) {
        return boardArticleDao.incrementHits(article_uid);
    }

    @Override
    public int writeArticle(int uid, int board_uid, String title, String content) {
        return 0;
    }
}
