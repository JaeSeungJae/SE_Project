import React, { useEffect, useState } from "react";
import className from "classnames/bind"
import styles from "./MenuBar.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = className.bind(styles)
const MenuBar = () => {
    const movePage = useNavigate();
    const handleMainPage = () => {
        movePage("/mainpage")
    }
    const handleLogOut = () => {
        const fetchData = async () =>{
            try{
                const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/logout');
                if(response.data.result ==='success'){
                    movePage('/login')
                } else{
                    alert('logout failed. please try again');
                }
            }catch(error){
                console.error('Error fetching data(HotCoin):',error);
            }
        };
        fetchData();
    }
    const handleMyPage = () => {
        movePage("/mypage/editProfile")
    }
    const handleCoinMarket = () => {
        movePage("/coinprice")
    }
    const handleMarketTrend = () => {
        movePage("/markettrend")
    }
    const handleInvestment = () => {
        movePage("/investment/balance")
    }
    const handleBoard = () => {
        movePage("/board")
    }

    return (
        <div className={cx("menu-bar")}>
            <div>
                <h1 onClick={handleMainPage}>KW Coin</h1>
            </div>
            <div className={cx("menu-page")}>
                <ul>
                    <li>
                        <a onClick={handleCoinMarket}>코인 시세/거래</a>
                    </li>
                    <li>
                        <a onClick={handleInvestment}>투자 내역</a>
                    </li>
                    <li>
                        <a onClick={handleBoard}>종목 토론 게시판</a>
                    </li>
                    <li>
                        <a onClick={handleMarketTrend}>시장 동향</a>
                    </li>
                </ul>
            </div>
            <div className={cx("user-fnc")}>
                <ul>
                    <li>
                        <a onClick={handleMyPage}>마이페이지</a>
                    </li>
                    <li>
                        <a onClick={handleLogOut}>로그아웃</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuBar