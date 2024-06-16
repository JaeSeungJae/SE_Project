package com.hc.demo.dao;

import com.hc.demo.container.Article;
import com.hc.demo.container.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminDao {
    List<Map<String,Object>> getUserList();


}
