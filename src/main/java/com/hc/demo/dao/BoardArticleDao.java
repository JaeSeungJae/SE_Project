package com.hc.demo.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardArticleDao {
    List<Map<String, Object>> getBoardArticleList(int board_uid);
}
