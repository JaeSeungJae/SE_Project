package com.hc.demo.service;

import com.hc.demo.dao.CoinDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hc.demo.container.User;
import java.util.HashMap;
import java.util.List;

@Service
public class CoinService implements CoinDao {
    @Autowired
    private CoinDao coinDao;
    @Override
    public int setCoinFavorite(int uid, int coin_uid) {
        return coinDao.setCoinFavorite(uid, coin_uid);
    }

    @Override
    public int unsetCoinFavorite(int uid, int coin_uid) {
        return coinDao.unsetCoinFavorite(uid, coin_uid);
    }

    @Override
    public List<HashMap<String, Object>> getCoinList(int uid) {
        return coinDao.getCoinList(uid);
    }

    @Override
    public int depositKRW(int uid, double reservedKRW) {
        return coinDao.depositKRW(uid, reservedKRW);
    }

    @Override
    public List<HashMap<String, Object>> getHotCoinList(int uid) {
        return coinDao.getHotCoinList(uid);
    }

    @Override
    public HashMap<String, Object> getCoinInfo(int uid, int coin_uid) {
        return coinDao.getCoinInfo(uid, coin_uid);
    }

    @Override
    public List<HashMap<String, Object>> getCoinPriceInfo(int coin_uid) {
        return coinDao.getCoinPriceInfo(coin_uid);
    }
}
