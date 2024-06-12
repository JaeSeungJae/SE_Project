package com.hc.demo.model;

import com.hc.demo.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.hc.demo.container.User;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CoinModel {
    @Autowired
    CoinService coinService;

    public int setCoinFavorite(int uid, int coin_uid) {
        return coinService.setCoinFavorite(uid, coin_uid);
    }

    public int unsetCoinFavorite(int uid, int coin_uid) {
        return coinService.unsetCoinFavorite(uid, coin_uid);
    }

    public List<HashMap<String,Object>> getCoinList(int uid) {
        return coinService.getCoinList(uid);
    }

    public int depositKRW(int uid, double reservedKRW) {
        return coinService.depositKRW(uid, reservedKRW);
    }

    public List<HashMap<String,Object>> getHotCoinList(int uid) {
        return coinService.getHotCoinList(uid);
    }

    public HashMap<String, Object> getCoinInfo(int uid, int coin_uid) {
        return coinService.getCoinInfo(uid, coin_uid);
    }

    public List<HashMap<String, Object>> getCoinPriceInfo(int coin_uid) {
        return coinService.getCoinPriceInfo(coin_uid);
    }

    public List<Map<String,Object>> getCoinDeals(int coin_uid) {
        return coinService.getCoinDeals(coin_uid);
    }

    public List<Map<String,Object>> getMyCoin(int uid) {
        return coinService.getMyCoin(uid);
    }
}
