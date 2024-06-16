package com.hc.demo.service;

import com.hc.demo.container.Article;
import com.hc.demo.container.Comment;
import com.hc.demo.dao.BoardArticleDao;
import com.hc.demo.dao.AdminDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService implements AdminDao {
    @Autowired
    private AdminDao adminDao;

    @Override
    public List<Map<String, Object>> getUserList() {
        return adminDao.getUserList();
    }


}
