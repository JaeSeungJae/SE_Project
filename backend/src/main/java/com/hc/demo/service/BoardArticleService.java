package com.hc.demo.service;

import com.hc.demo.container.Article;
import com.hc.demo.container.Comment;
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
    public List<Map<String, Object>> getHotArticles() {
        return boardArticleDao.getHotArticles();
    }

    @Override
    public Article getArticle(int article_uid) {
        return boardArticleDao.getArticle(article_uid);
    }

    @Override
    public int modifyArticle(int article_uid,String title, String content) {
        return boardArticleDao.modifyArticle(article_uid, title, content);
    }

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
        return boardArticleDao.writeArticle(uid, board_uid,title,content);
    }

    @Override
    public int writeComment(int uid, int article_uid, String comment) {
        return boardArticleDao.writeComment(uid, article_uid,comment);
    }


    @Override
    public int updateComment(int uid, String comment) {
        return boardArticleDao.updateComment(uid, comment);
    }

    @Override
    public int DeleteArticle(int article_uid) {
        return boardArticleDao.DeleteArticle(article_uid);
    }

    @Override
    public Comment getComment(int comment_uid) {
        return boardArticleDao.getComment(comment_uid);
    }

    @Override
    public int DeleteComment(int comment_uid) {
        return boardArticleDao.DeleteComment(comment_uid);
    }
}
