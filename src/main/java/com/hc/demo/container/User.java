package com.hc.demo.container;

public class User {
    private int uid, reservedKRW;
    private String ID, PW, Name, Nickname;

    public User(int uid, String ID, String PW, String Name, String Nickname, int reservedKRW) {
        this.uid = uid;
        this.ID = ID;
        this.PW = PW;
        this.Name = Name;
        this.Nickname = Nickname;
        this.reservedKRW = reservedKRW;
    }

    public String getName() {
        return this.Name;
    }

    public String getID() {
        return ID;
    }
}

