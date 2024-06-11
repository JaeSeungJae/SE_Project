package com.hc.demo.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CoinDao {
    int setCoinFavorite(int uid, int coin_uid);

    int unsetCoinFavorite(int uid, int coin_uid);

    List<HashMap<String, Object>> getCoinList(int uid);

    List<HashMap<String, Object>> getHotCoinList(int uid);

    HashMap<String, Object> getCoinInfo(int uid, int coin_uid);

    List<HashMap<String, Object>> getCoinPriceInfo (int coin_uid);

}
