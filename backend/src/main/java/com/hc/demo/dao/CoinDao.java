package com.hc.demo.dao;

import org.apache.ibatis.annotations.Mapper;
import com.hc.demo.container.User;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface CoinDao {
    int setCoinFavorite(int uid, int coin_uid);

    int unsetCoinFavorite(int uid, int coin_uid);

    List<HashMap<String, Object>> getCoinList(int uid);

    List<HashMap<String, Object>> getHotCoinList(int uid);

    HashMap<String, Object> getCoinInfo(int uid, int coin_uid);

    List<HashMap<String, Object>> getCoinPriceInfo (int coin_uid);

    int depositKRW(int uid, double reservedKRW);

    List<Map<String,Object>> getCoinDeals(int coin_uid);

    List<Map<String,Object>> getMyCoin(int uid);

    double getLatestPriceInfo(int coin_uid);

    int checkMoney(int uid, double amount);

    int checkCoin(int uid, int coin_uid, double coin_count);

    void buyCoin(int uid, int coin_uid, double amount);

    void discountKRW(int uid, double amount);

    void sellCoin(int uid, int coin_uid, double coin_count);

    void addKRW(int uid, int coin_uid, double coin_count);

}
