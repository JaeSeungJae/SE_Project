import React from "react";
import className from "classnames/bind";
import styles from "./Balance.module.css"
import { useState, useEffect } from "react";
import MenuBar from "../../../modules/menuBar/MenuBar";
import axios from "axios";

const cx = className.bind(styles);

const Balance = () => {

    const [balanceWon, setBalanceWon] =useState("0");


    return (
        <div>
            <MenuBar />
            <div className={cx("balance-container")}>
                <h2>보유 자산</h2>
                <div className={cx("balance")}>
                    <div className={cx("balance-won")}>
                        <a>보유 예치금</a>
                        <a style={{textAlign:"right"}}>{balanceWon} KRW</a>
                    </div>
                    <div className={cx("balance-total")}>
                        <a>총 보유자산</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Balance;