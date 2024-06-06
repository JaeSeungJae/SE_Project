package com.hc.demo.model;

import com.hc.demo.container.Article;
import com.hc.demo.container.Board;
import com.hc.demo.container.Pair;
import com.hc.demo.service.BoardArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class BoardArticleModel {
    @Autowired
    BoardArticleService boardArticleService;

    public List<Map<String,Object>> getBoardArticleList(int board_uid) {
        return boardArticleService.getBoardArticleList(board_uid);
    }
}
