package com.hc.demo.model;

import com.hc.demo.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.hc.demo.container.User;
import java.util.HashMap;
import java.util.List;

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
}
