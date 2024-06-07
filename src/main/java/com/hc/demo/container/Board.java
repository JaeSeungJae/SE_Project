package com.hc.demo.container;

public class Board {
    private int uid, read_level, write_level;
    private String name;

    public Board(int uid, String name) {
        this.uid = uid;
        this.name = name;
        this.read_level = 0;
        this.write_level = 0;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public void setName(String name) {
        this.name = name;
    }
}
