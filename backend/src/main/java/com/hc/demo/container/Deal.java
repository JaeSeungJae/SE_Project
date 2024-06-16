package com.hc.demo.container;

import java.time.LocalDateTime;

public class Deal {
    String coin_name, coin_symbol;
    private int uid, member_uid, coin_uid;
    private double contracted_price, contracted_size, contracted_cost;
    LocalDateTime contracted_time;
    public Deal(int uid, int member_uid, int coin_uid, double contracted_price, double contracted_size, double contracted_cost, LocalDateTime contracted_time, String coin_name, String coin_symbol) {
        this.uid = uid;
        this.member_uid = member_uid;
        this.coin_uid = coin_uid;
        this.contracted_price = contracted_price;
        this.contracted_size = contracted_size;
        this.contracted_cost = contracted_cost;
        this.contracted_time = contracted_time;
        this.coin_name = coin_name;
        this.coin_symbol = coin_symbol;
    }


    public int getUid() {
        return uid;
    }

    public int getMember_uid() {
        return member_uid;
    }

    public int getCoin_uid() {
        return coin_uid;
    }

    public double getContracted_price() {
        return contracted_price;
    }

    public double getContracted_size() {
        return contracted_size;
    }

    public double getContracted_cost() {
        return contracted_cost;
    }

    public void setContracted_cost(double contracted_cost) {
        this.contracted_cost = contracted_cost;
    }

    public LocalDateTime getContracted_time() {
        return contracted_time;
    }

    public String getCoin_name() {
        return coin_name;
    }

    public String getCoin_symbol() {
        return coin_symbol;
    }
}

