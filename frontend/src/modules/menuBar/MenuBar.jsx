import React, { useEffect, useState } from "react";
import className from "classnames/bind"
import styles from "./MenuBar.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {getUserInfo} from "../../hooks/getUserInfo/getUserInfo";

const cx = className.bind(styles)
const MenuBar = () => {
    const movePage = useNavigate();
    const handleMainPage = () => {
        movePage("/mainpage")
    }

    const [isAuth, setIsAuth] = useState(null);

    useEffect(()=>{
        const checkAuth = async () =>{
            const userInfo = await getUserInfo();
            
            setIsAuth(userInfo.logged);
        };
        checkAuth();
    },[]);

    
    useEffect(()=>{
        if (isAuth === false){
            alert("로그인 후 이용하시길 바랍니다.")
            movePage("/login")
        }
    },[isAuth])


    const handleLogOut = () => {
        axios.get('https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/logout')
            .then(response => {
                if (response.data.result === 'success') {
                    movePage('/login')
                } else {
                    alert('logout failed. Please try again');
                }
            })
            .catch(error => {
                console.error("Error!!", error);
            });

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
                        <a>투자 내역</a>
                    </li>
                    <li>
                        <a>종목 토론 게시판</a>
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