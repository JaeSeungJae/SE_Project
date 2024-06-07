package com.hc.demo.container;

public class User {
    private int uid, reservedKRW, level;
    private String ID, PW, Name, Nickname;

    public User(int uid, String ID, String PW, String Name, String Nickname, int level, int reservedKRW) {
        this.uid = uid;
        this.ID = ID;
        this.PW = PW;
        this.Name = Name;
        this.Nickname = Nickname;
        this.level = level;
        this.reservedKRW = reservedKRW;
    }

    public String getName() {
        return this.Name;
    }

    public String getID() {
        return ID;
    }

    public String getNickname() {
        return Nickname;
    }

    public int getLevel() {
        return level;
    }

    public void setNickname(String nickname) {
        Nickname = nickname;
    }
}

