import React from "react";
import className from "classnames/bind";
import styles from "./Balance.module.css"
import { useState, useEffect } from "react";
import MenuBar from "../../../modules/menuBar/MenuBar";
import axios from "axios";

const cx = className.bind(styles);

const Balance = () => {

    const [balanceWon, setBalanceWon] = useState(0);
    const [balanceTotal, setBalanceTotal] = useState(0)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [totalGainLoss, setTotalGainLoss] = useState(0)
    const [totalValuation, setTotalValuation] = useState(0)
    const [totalValuationRate, setTotalValuationRate] = useState(0)
    const [coinData, setCoinData] = useState([])

    const [rechargeWon, setRechargeWon] = useState();

    const testData = [
        { "coin_uid": 1, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": 1000, "gain_loss_percent": 20, "count": 10, "eval_price": 10000, "avg_unit_price": 20000, "current_unit_price": 10000 },
        { "coin_uid": 2, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": -2000, "gain_loss_percent": -30, "count": 20, "eval_price": 20000, "avg_unit_price": 30000, "current_unit_price": 20000 },
        { "coin_uid": 3, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": -3000, "gain_loss_percent": -40, "count": 30, "eval_price": 30000, "avg_unit_price": 40000, "current_unit_price": 30000 },
        { "coin_uid": 4, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": -4000, "gain_loss_percent": -50, "count": 40, "eval_price": 40000, "avg_unit_price": 50000, "current_unit_price": 40000 },
        { "coin_uid": 5, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": -5000, "gain_loss_percent": -60, "count": 50, "eval_price": 50000, "avg_unit_price": 60000, "current_unit_price": 50000 },
        { "coin_uid": 6, "coin_name": "비트코인", "coin_symbol": "BTC", "gain_loss_amount": -6000, "gain_loss_percent": -70, "count": 60, "eval_price": 60000, "avg_unit_price": 70000, "current_unit_price": 60000 }
    ]

    useEffect(() => {
        setBalanceTotal(balanceWon + totalValuation)
    }, [balanceWon, totalValuation]);

    useEffect(() => {
        const purchaseCal = testData.reduce((acc, item) => acc + (item.count * item.avg_unit_price), 0);
        setTotalPurchase(purchaseCal);
    }, [testData]);

    useEffect(() => {
        const evalCal = testData.reduce((acc, item) => acc + (item.count * item.eval_price), 0);
        setTotalValuation(evalCal);
    }, [testData]);

    useEffect(() => {
        const gainLossCal = testData.reduce((acc, item) => acc + item.gain_loss_amount, 0);
        setTotalGainLoss(gainLossCal);
    }, [testData]);

    useEffect(() => {
        const gainLossPercentCal = (totalGainLoss / totalPurchase);
        setTotalValuationRate(gainLossPercentCal.toFixed(4))
    }, [totalGainLoss, totalPurchase])

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleRecharge = (event) => {
        const inputValue = event.target.value;
        if (!inputValue || /^[0-9\b]+$/.test(inputValue)) {
            setRechargeWon(inputValue);
        }
    }
    const handleKeyDown = (event) => {
        // Prevent 'e', 'E', '+', '-' from being input
        if (['e', 'E', '+', '-'].includes(event.key)) {
            event.preventDefault();
        }
    };

    const rechargeButton = () =>{
        window.location.reload();
    }


    return (
        <div>
            <MenuBar />
            <div className={cx("balance-container")}>
                <div className={cx("title")}>
                    <h2>보유 자산</h2>
                    <button onClick={togglePopup}>충전</button>
                    {isOpen && (
                        <div className={cx("popup")}>
                            <div className={cx("popup-inner")}>
                                <h2>원화 충전</h2>
                                <p>충전 금액을 입력하시오.</p>
                                <input className={cx("input-number")} type="number" placeholder="Enter a number" value={rechargeWon} onChange={handleRecharge} onKeyDown={handleKeyDown}></input>
                                <div className={cx("button-container")}>
                                    <button onClick={rechargeButton} style={{ backgroundColor: "green" }}>충전</button>
                                    <button onClick={togglePopup}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx("balance")}>
                    <div className={cx("balance-format")}>
                        <a>보유 예치금</a>
                        <a style={{ textAlign: "right" }}>{balanceWon} KRW</a>
                    </div>
                    <div className={cx("balance-format")}>
                        <a>총 보유자산</a>
                        <a style={{ textAlign: "right" }}>{balanceTotal} KRW</a>
                    </div>
                </div>
                <div className={cx("balance-detail")}>
                    <div className={cx("balance-format")}>
                        <a>총매수금액</a>
                        <a style={{ textAlign: "right" }}>{totalPurchase} KRW</a>
                    </div>
                    <div className={cx("balance-format")}>
                        <a>총평가손익</a>
                        <a style={{ textAlign: "right" }} className={cx("color-format", { positive: totalGainLoss > 0, negative: totalGainLoss < 0 })}>
                            {totalGainLoss > 0 ? `+${totalGainLoss}` : `${totalGainLoss}`} KRW
                        </a>
                    </div>
                    <div className={cx("balance-format")}>
                        <a>총평가금액</a>
                        <a style={{ textAlign: "right" }}>{totalValuation} KRW</a>
                    </div>
                    <div className={cx("balance-format")}>
                        <a>총평가수익률</a>
                        <a style={{ textAlign: "right" }} className={cx("color-format", { positive: totalValuationRate > 0, negative: totalValuationRate < 0 })}>
                            {totalValuationRate > 0 ? `+${totalValuationRate}` : `${totalValuationRate}`} %
                        </a>
                    </div>
                </div>
                <div className={cx("balance-coinlist")}>
                    <h2>보유 코인 현황</h2>
                    <div>
                        <table className={cx("coin-table")}>
                            <thead>
                                <tr>
                                    <th className={cx("column-format")}>
                                        코인이름
                                    </th>
                                    <th className={cx("column-format")}>
                                        보유수량
                                    </th>
                                    <th className={cx("column-format")}>
                                        매수평균가
                                    </th>
                                    <th className={cx("column-format")}>
                                        현재가
                                    </th>
                                    <th className={cx("column-format")}>
                                        평가금액
                                    </th>
                                    <th className={cx("column-format")}>
                                        평가손익
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {testData.map((coin) => (
                                    <tr key={coin.coin_uid}>
                                        <td className={cx("column-format")}>
                                            <div>{coin.coin_name}</div>
                                            <div className={cx("coin-symbol")}>{coin.coin_symbol}</div>
                                        </td>
                                        <td className={cx("column-format")}>
                                            <div>{coin.count}</div>
                                        </td>
                                        <td className={cx("column-format")}>
                                            <div>{coin.avg_unit_price.toLocaleString()}</div>
                                        </td>
                                        <td className={cx("column-format")}>
                                            <div>{coin.current_unit_price.toLocaleString()}</div>
                                        </td>
                                        <td className={cx("column-format")}>
                                            <div>{coin.eval_price.toLocaleString()}</div>
                                        </td>
                                        <td className={cx("column-format")}>
                                            <div className={cx("color-format", { positive: coin.gain_loss_percent > 0, negative: coin.gain_loss_percent < 0 })}>
                                                {coin.gain_loss_percent > 0 ? `+${coin.gain_loss_percent}` : `${coin.gain_loss_percent}`} %
                                            </div>
                                            <div style={{fontSize:"10px"}} className={cx("color-format", { positive: coin.gain_loss_amount > 0, negative: coin.gain_loss_amount < 0 })}>
                                                {coin.gain_loss_amount.toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Balance;