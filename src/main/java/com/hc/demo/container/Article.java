package com.hc.demo.container;

import java.time.LocalDateTime;

public class Article {
    private int uid, board_uid, member_uid,hits;
    private String title, content;
    private LocalDateTime created_date;

    public Article(int uid, int board_uid, int member_uid, int hits, String title, String content, LocalDateTime created_date) {
        this.uid = uid;
        this.board_uid = board_uid;
        this.member_uid = member_uid;
        this.hits = hits;
        this.title = title;
        this.content = content;
        this.created_date = created_date;
    }
}
