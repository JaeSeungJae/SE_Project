import React from "react";
import className from "classnames/bind"
import styles from "./MenuBar.module.css"
import { useNavigate } from "react-router-dom";

const cx = className.bind(styles)
const MenuBar = () => {
    const movePage = useNavigate();
    const handleMainPage = () => {
        movePage("/mainpage")
    }
    const handleLogOut = () => {
        movePage("/login")
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