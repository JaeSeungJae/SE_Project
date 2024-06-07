package com.hc.demo.container;


import java.time.LocalDateTime;

public class Comment {
    private int uid, article_uid, user_uid;
    private String comment;
    private LocalDateTime created_date;

    public Comment(int uid, int article_uid, int user_uid, String comment, LocalDateTime created_date) {
        this.uid = uid;
        this.article_uid = article_uid;
        this.user_uid = user_uid;
        this.comment = comment;
        this.created_date = created_date;
    }
}
