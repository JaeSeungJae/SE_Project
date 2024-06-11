package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.User;
import com.hc.demo.model.CoinModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;

@RestController
public class CoinController {

    @Autowired
    CoinModel coinModel;

    @GetMapping("/rest/setCoinFavorite")
    @ResponseBody
    public String setCoinFavorite(HttpServletRequest req, @RequestParam(value = "coin_uid") int coin_uid) {
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        JsonObject jo = new JsonObject();
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        try{
            coinModel.setCoinFavorite(((User)hs.getAttribute("User")).getUid(),coin_uid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        return jo.toString();
    }

    @GetMapping("/rest/unsetCoinFavorite")
    @ResponseBody
    public String unsetCoinFavorite(HttpServletRequest req, @RequestParam(value = "coin_uid") int coin_uid) {
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        JsonObject jo = new JsonObject();
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        try{
            coinModel.unsetCoinFavorite(((User)hs.getAttribute("User")).getUid(),coin_uid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        return jo.toString();
    }

    @GetMapping("/rest/getCoinList")
    @ResponseBody
    public String getCoinList(HttpServletRequest req) {
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        JsonObject jo = new JsonObject();
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        JsonArray ja = new JsonArray();
        try {
            List<HashMap<String, Object>>  coinInfo = coinModel.getCoinList(((User)hs.getAttribute("User")).getUid());
            for(HashMap<String, Object> coin : coinInfo) {
                JsonObject item = new JsonObject();
                DecimalFormat df = new DecimalFormat("#.00");
                item.addProperty("coin_uid", coin.get("uid").toString());
                item.addProperty("coin_name", coin.get("name").toString());
                item.addProperty("coin_symbol", coin.get("symbol").toString());
                item.addProperty("current_unit_price", coin.get("closing_price").toString());
//                item.addProperty("current_unit_price", df.format(coin.get("closing_price")));
                item.addProperty("fluc_percent", coin.get("updown_rate").toString());
                item.addProperty("fluc_amount", coin.get("updown_amount").toString());
                item.addProperty("is_favorite", coin.get("is_favorite").toString());
                ja.add(item);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        jo.add("data",ja);
        return jo.toString();
    }
}
