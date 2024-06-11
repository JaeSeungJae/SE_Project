package com.hc.demo.dao;

import org.apache.ibatis.annotations.Mapper;
import com.hc.demo.container.User;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface CoinDao {
    int setCoinFavorite(int uid, int coin_uid);

    int unsetCoinFavorite(int uid, int coin_uid);

    List<HashMap<String, Object>> getCoinList(int uid);

    int depositKRW(int uid, double reservedKRW);
}
