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

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                item.addProperty("coin_uid", coin.get("uid").toString());
                item.addProperty("coin_name", coin.get("name").toString());
                item.addProperty("coin_symbol", coin.get("symbol").toString());
                item.addProperty("current_unit_price", coin.get("closing_price").toString());
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

    @GetMapping("/rest/getHotCoinList")
    @ResponseBody
    public String getHotCoinList(HttpServletRequest req) {
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        JsonObject jo = new JsonObject();
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        JsonArray ja = new JsonArray();
        try {
            List<HashMap<String, Object>>  coinInfo = coinModel.getHotCoinList(((User)hs.getAttribute("User")).getUid());
            for(HashMap<String, Object> coin : coinInfo) {
                JsonObject item = new JsonObject();
                item.addProperty("coin_uid", coin.get("uid").toString());
                item.addProperty("coin_name", coin.get("name").toString());
                item.addProperty("coin_symbol", coin.get("symbol").toString());
                item.addProperty("current_unit_price", coin.get("closing_price").toString());
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

    @GetMapping("/rest/getCoinInfo")
    @ResponseBody
    public String getCoinInfo(HttpServletRequest req, @RequestParam(value = "coin_uid") int coin_uid) {
        JsonObject jo = new JsonObject();
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        JsonObject item = new JsonObject();
        try {
            HashMap<String, Object> coinInfo = coinModel.getCoinInfo(((User)hs.getAttribute("User")).getUid(),coin_uid);
            item.addProperty("coin_uid", coinInfo.get("uid").toString());
            item.addProperty("coin_name", coinInfo.get("name").toString());
            item.addProperty("coin_symbol", coinInfo.get("symbol").toString());
            item.addProperty("current_unit_price", coinInfo.get("closing_price").toString());
            item.addProperty("fluc_percent", coinInfo.get("updown_rate").toString());
            item.addProperty("fluc_amount", coinInfo.get("updown_amount").toString());
            item.addProperty("is_favorite", coinInfo.get("is_favorite").toString());

        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        jo.add("data",item);
        return jo.toString();
    }

    @GetMapping("/rest/getCoinPriceInfo")
    @ResponseBody
    public String getCoinPriceInfo(@RequestParam(value = "coin_uid") int coin_uid) {
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        try {
            List<HashMap<String, Object>>  coinInfo = coinModel.getCoinPriceInfo(coin_uid);
            for(HashMap<String, Object> oneday : coinInfo) {
                JsonObject item = new JsonObject();
                item.addProperty("date", oneday.get("standard_time").toString());
                item.addProperty("opening_price", oneday.get("opening_price").toString());
                item.addProperty("upper_limit_price", oneday.get("upper_limit_price").toString());
                item.addProperty("closing_price", oneday.get("lower_limit_price").toString());
                item.addProperty("lower_limit_price", oneday.get("closing_price").toString());
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

    @GetMapping("/rest/getCoinDeals")
    public String getCoinDeals(HttpServletRequest req, @RequestParam(value = "coin_uid") int coin_uid) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        try {

            List<Map<String,Object>> deals = coinModel.getCoinDeals(coin_uid);
//            System.out.println(deals);
            for (Map<String,Object> deal : deals) {
                JsonObject item = new JsonObject();
                item.addProperty("coin_uid", deal.get("coin_uid").toString());
                item.addProperty("coin_name", deal.get("name").toString());
                item.addProperty("coin_symbol", deal.get("symbol").toString());
                item.addProperty("unit_price", deal.get("contracted_price").toString());
                item.addProperty("unit_count", deal.get("contracted_size").toString());
                item.addProperty("contracted_time", deal.get("contracted_time").toString());
                ja.add(item);
            }
            jo.addProperty("result", "success");
            jo.add("data", ja);
            return jo.toString();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
//            jo.add("data", ja);
            return jo.toString();
        }
    }

    @GetMapping("/rest/getMyCoin")
    public String getMyCoin(HttpServletRequest req) {
        HttpSession hs = req.getSession();
        JsonObject jo = new JsonObject();
        JsonArray ja = new JsonArray();
        if (hs != null && hs.getAttribute("Logged") != null && (Boolean) hs.getAttribute("Logged")) {
            try {
                User user = (User) hs.getAttribute("User");
                List<Map<String, Object>> mycoins = coinModel.getMyCoin(user.getUid());
                System.out.println(mycoins);
                for (Map<String, Object> mycoin : mycoins) {
                    JsonObject item = new JsonObject();
                    double total_cost = ((BigDecimal)mycoin.get("total_contracted_cost")).doubleValue();
                    double total_size = ((BigDecimal)mycoin.get("total_contracted_size")).doubleValue();
                    double curr_price = ((BigDecimal)mycoin.get("closing_price")).doubleValue();
                    double count = ((BigDecimal)mycoin.get("total_contracted_size")).doubleValue();

                    item.addProperty("coin_uid", mycoin.get("coin_uid").toString());
                    item.addProperty("coin_name", mycoin.get("name").toString());
                    item.addProperty("coin_symbol", mycoin.get("symbol").toString());
                    item.addProperty("gain_loss_amount", String.format("%.2f",(curr_price * total_size) - total_cost));
                    item.addProperty("gain_loss_percent", String.format("%.2f",(((curr_price * total_size) - total_cost) / total_cost) * 100));
                    item.addProperty("count", String.format("%.2f", count));
                    item.addProperty("eval_price", String.format("%.2f",curr_price * total_size));
                    item.addProperty("avg_unit_price", String.format("%.2f",total_cost / total_size));
                    item.addProperty("current_unit_price", String.format("%.2f", curr_price));
                    ja.add(item);
                }
                jo.addProperty("result", "success");
                jo.add("data", ja);
                return jo.toString();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                jo.addProperty("result", "failed");
                //            jo.add("data", ja);
                return jo.toString();
            }
        } else {
            jo.addProperty("result", "failed");
            return jo.toString();
        }
    }

    @PostMapping("/rest/buyCoin")
    public String buyCoin(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        JsonObject jo = new JsonObject();
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        try {
            int result = coinModel.buyCoin( ((User)hs.getAttribute("User")).getUid(),(int)body.get("coin_uid"), (double)body.get("price_amount"));
            if(result == 0) {
                jo.addProperty("result", "failed");
                jo.addProperty("reason", "not enough money");
                return jo.toString();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            jo.addProperty("reason", "internal server error");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        return jo.toString();
    }

    @PostMapping("/rest/sellCoin")
    public String sellCoin(HttpServletRequest req, @RequestBody HashMap<String,Object> body) {
        JsonObject jo = new JsonObject();
        HttpSession hs = req.getSession(false); // 사용자 세션정보 조회
        if(hs == null){ // 세션 유무 체크
            jo.addProperty("result", "failed");
            System.out.println("null session error");
            return jo.toString();
        }
        try {
            int result = coinModel.sellCoin( ((User)hs.getAttribute("User")).getUid(),(int)body.get("coin_uid"), (double)body.get("sell_count"));
            if(result == 0) {
                jo.addProperty("result", "failed");
                jo.addProperty("reason", "not enough coins");
                return jo.toString();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            jo.addProperty("result", "failed");
            jo.addProperty("reason", "internal server error");
            return jo.toString();
        }
        jo.addProperty("result", "success");
        return jo.toString();
    }

}
