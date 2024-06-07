package com.hc.demo.model;

import com.hc.demo.service.BoardArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
}
