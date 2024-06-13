import React from "react";
import styles from "./Favorite.module.css"
import className from "classnames/bind"
import { useState, useEffect } from "react";
import axios from "axios";

const cx = className.bind(styles);

const Favorite = () => {


    const [coinList, setCoinList] = useState([]);
    useEffect(() => {
        axios.get("https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/getCoinList")
            .then(response => {
                console.log(response.data.data)
                setCoinList(response.data.data)
            })
            .catch(error => {
                console.error("Error!!", error);
            });
    }, [])

    const [favorite_Data, setFavorite_Data] = useState([]);

    useEffect(() => {
        const filter_data= coinList.filter(item => item.is_favorite === "1")
        setFavorite_Data(filter_data);
    }, [coinList])

    return (
        <div className={cx("hot-coin")}>
            <h3>즐겨찾기</h3>
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
                    {favorite_Data.slice(0, 5).map((coin) => (
                        <tr key={coin.coin_uid}>
                            <td className={cx("column-name")}>
                                <div>{coin.coin_name}</div>
                                <div className={cx("coin-symbol")} >{coin.coin_symbol}</div>
                            </td>
                            <td className={cx("column-price")}>
                                <div className={cx("coin-price", { positive: coin.fluc_percent > 0, negative: coin.fluc_percent < 0 })}>
                                    {coin.current_unit_price.toLocaleString()}
                                </div>
                            </td>
                            <td className={cx("column-fluc")}>
                                <div className={cx("coin-fluc-percent", { positive: coin.fluc_percent > 0, negative: coin.fluc_percent < 0 })}>
                                    {coin.fluc_percent > 0 ? `+${coin.fluc_percent}` : `${coin.fluc_percent}`}%
                                </div>
                                <div className={cx("coin-fluc-amount", { positive: coin.fluc_percent > 0, negative: coin.fluc_percent < 0 })}>
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

export default Favorite;