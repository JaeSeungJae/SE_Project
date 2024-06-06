package com.hc.demo.service;

import com.hc.demo.dao.BoardArticleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardArticleService implements BoardArticleDao {
    @Autowired
    private BoardArticleDao boardArticleDao;

    @Override
    public List<Map<String,Object>> getBoardArticleList(int board_uid) {
        return boardArticleDao.getBoardArticleList(board_uid);
    }
}
