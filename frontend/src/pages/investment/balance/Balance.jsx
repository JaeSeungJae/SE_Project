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


    /**getMyKRW & getMyCoin */
    useEffect(() => {
        /**패치 */
        const fetchData = async () => {
            try {
                const responseKRW = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getMyKRW');
                if (responseKRW.data.result === 'success') {
                    setBalanceWon(responseKRW.data.amount)
                    console.log(responseKRW.data)
                } else {
                    alert('getMYKRW failed. please try again');
                }
                const responseCoin = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getMyCoin');
                if (responseCoin.data.result === 'success') {
                    setCoinData(responseCoin.data.data)
                    console.log(responseCoin.data)
                } else {
                    alert('getMyCoin failed. Please try again');
                }
            } catch (error) {
                console.error('Error fetching data(getMyKRW or getMyCoin):', error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        setBalanceTotal(balanceWon + totalValuation)
    }, [balanceWon, totalValuation]);

    useEffect(() => {
        const purchaseCal = coinData.reduce((acc, item) => acc + (item.count * item.avg_unit_price), 0);
        setTotalPurchase(purchaseCal);
    }, [coinData]);

    useEffect(() => {
        const evalCal = coinData.reduce((acc, item) => acc + (item.count * item.eval_price), 0);
        setTotalValuation(evalCal);
    }, [coinData]);

    useEffect(() => {
        const gainLossCal = coinData.reduce((acc, item) => acc + item.gain_loss_amount, 0);
        setTotalGainLoss(gainLossCal);
    }, [coinData]);

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
        if (!inputValue || /^[0-9\b.]+$/.test(inputValue)) {
            setRechargeWon(inputValue);
        }
    }
    const handleKeyDown = (event) => {
        // Prevent 'e', 'E', '+', '-' from being input
        if (['e', 'E', '+', '-'].includes(event.key)) {
            event.preventDefault();
        }
    };

    const rechargeButton = () => {
        const fetchData = async () => {
            try {
                console.log(rechargeWon);
                let amount = parseFloat(rechargeWon);
                const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/depositKRW', {
                    amount: amount
                });
                if (response.data.result === 'success') {
                    window.location.reload();
                } else {
                    alert('Recharge failed. Please try again');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error fetching data(Recharge):', error);
            }
        };
        fetchData();
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
                                <form onSubmit={rechargeButton}>
                                    <h2>원화 충전</h2>
                                    <p>충전 금액을 입력하시오.</p>
                                    <input className={cx("input-number")} type="number" placeholder="Enter a number" value={rechargeWon} onChange={handleRecharge} onKeyDown={handleKeyDown} step="0.1"></input>
                                    <div className={cx("button-container")}>
                                        <button type="submit" style={{ backgroundColor: "green" }}>충전</button>
                                        <button onClick={togglePopup}>Close</button>
                                    </div>
                                </form>
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
                                {coinData.map((coin) => (
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
                                            <div style={{ fontSize: "10px" }} className={cx("color-format", { positive: coin.gain_loss_amount > 0, negative: coin.gain_loss_amount < 0 })}>
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