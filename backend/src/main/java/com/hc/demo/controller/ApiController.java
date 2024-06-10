package com.hc.demo.controller;

import com.hc.demo.model.ApiModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
@RestController
public class ApiController {
    @GetMapping(value = "/rest/getCoinNews", produces = "application/json; charset=utf8")
    public String getCoinNews() {
        String query = null;
        try {
            query = URLEncoder.encode("코인", "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        String apiURL = "https://openapi.naver.com/v1/search/news.json?query="+query+"&display=3&sort=sim";
        Map<String, String> requestHeaders = new HashMap<>();
        String clientId = "gf5yJwBSnzC5jQE_ZCeL"; //애플리케이션 클라이언트 아이디
        String clientSecret = "60buaFtr1k"; //애플리케이션 클라이언트 시크릿
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        return ApiModel.get(apiURL,requestHeaders);
    }
}
