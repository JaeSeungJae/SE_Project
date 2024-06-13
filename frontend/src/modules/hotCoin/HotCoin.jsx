import React, { useEffect, useState } from "react";
import styles from "./HotCoin.module.css"
import className from "classnames/bind"
import axios from "axios";

const cx = className.bind(styles);

const HotCoin = () => {

    const [hotCoin_Data,setHotCoin_Data] = useState([]);

    useEffect(()=>{
        axios.get("https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/getHotCoinList")
            .then(response => {
                console.log(response.data.data)
                setHotCoin_Data(response.data.data)
            })
            .catch(error => {
                console.error("Error!!", error);
            });
    },[])

    return (
        <div className={cx("hot-coin")}>
            <h3>주요코인시세</h3>
            <table className={cx("coin-table")}>
                <thead>
                    <tr>
                        <th className={cx("column-name")}>
                            종목
                        </th>
                        <th className={cx("column-price")}>
                            시세(KRW)
                        </th>
                        <th className={cx("column-fluc")}>
                            전일대비
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {hotCoin_Data.map((coin)=>(
                        <tr key={coin.coin_uid}>
                            <td className={cx("column-name")}>
                                <div>{coin.coin_name}</div>
                                <div className={cx("coin-symbol")} >{coin.coin_symbol}</div>
                            </td>
                            <td className={cx("column-price")}>
                                <div className={cx("coin-price",{positive: coin.fluc_percent>0,negative: coin.fluc_percent <0})}>
                                    {coin.current_unit_price.toLocaleString()}
                                </div>
                            </td>
                            <td className={cx("column-fluc")}>
                                <div className={cx("coin-fluc-percent",{positive: coin.fluc_percent>0,negative: coin.fluc_percent <0})}>
                                    {coin.fluc_percent>0?`+${coin.fluc_percent}`:`${coin.fluc_percent}`}%
                                </div>
                                <div className={cx("coin-fluc-amount",{positive: coin.fluc_percent>0,negative: coin.fluc_percent <0})}>
                                    {coin.fluc_amount.toLocaleString()}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default HotCoin;