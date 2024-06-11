package com.hc.demo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.hc.demo.container.User;
import com.hc.demo.model.CoinModel;
import com.hc.demo.model.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;

@RestController
public class CoinController {

    @Autowired
    CoinModel coinModel;
    @Autowired
    UserModel userModel;

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

    @GetMapping("/rest/getMyKRW")
    public String getMyKRW(HttpServletRequest req) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();

        if(hs!=null && hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged")) {
            User user = (User)hs.getAttribute("User");
            jo.addProperty("result","success");
            jo.addProperty("amount",user.getReservedKRW());
        }
        else {
            jo.addProperty("result", "failed");
        }

        return jo.toString();
    }

    @PostMapping("/rest/depositKRW")
    public String depositKRW(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();

        if(hs!=null && hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged")) {
            User user = (User)hs.getAttribute("User");
            double modify_KRW = user.getReservedKRW()+(double)body.get("amount");
            user.setReservedKRW(modify_KRW);
            coinModel.depositKRW(user.getUid(), modify_KRW);
            hs.setAttribute("User",user);
            jo.addProperty("result","success");
        }
        else {
            jo.addProperty("result", "failed");
        }

        return jo.toString();
    }

    @GetMapping("/rest/getCoinDeals")
    public String getCoinDeals(HttpServletRequest req, @RequestParam(value = "board_uid") int coin_uid) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();

        if(hs!=null && hs.getAttribute("Logged") != null && (Boolean)hs.getAttribute("Logged")) {
            User user = (User)hs.getAttribute("User");
            double modify_KRW = user.getReservedKRW()+(double)body.get("amount");
            user.setReservedKRW(modify_KRW);
            coinModel.depositKRW(user.getUid(), modify_KRW);
            hs.setAttribute("User",user);
            jo.addProperty("result","success");
        }
        else {
            jo.addProperty("result", "failed");
        }

        return jo.toString();
    }
}
