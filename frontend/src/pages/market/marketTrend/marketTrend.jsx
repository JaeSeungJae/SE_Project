import React from "react";
import MenuBar from "../../../modules/menuBar/MenuBar";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import CoinNews from "../../../modules/coinNews/CoinNews"

const CoinScore = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    height: 400px;
    width: 100%;
    margin: 20px;
    padding: 20px;
    justify-content: center;
    align-items: center;

    span {
        display: block;
        text-align: left;
        margin: 10px;
        font-size: 16px;
        font-weight: bold;
        color : black;
    }
`;

const News = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 60%;
    width: calc(100% - 80px);
    margin: 20px;
    padding: 20px;
    justify-content: center;
    align-items: center;
`

const FlexBox = styled.div`
    display: flex;
`
const Container = styled.div`
    margin: 0px 30px;
    //overflow-y: auto;
`

const NewsContent = styled.div`
    background-color: #F0F0F0;
    border-radius: 10px;
    height: 350px;
    margin: 20px 0;
    padding: 20px;
    justify-content: center;
    align-items: center;
    span {
        display: block;
        text-align: left;
        margin: 10px;
        font-size: 16px;
        font-weight: bold;
        color: black;
    }
`

const CandleStick = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    height: 350px;
    margin: 20px 0;
    width: 100%;
`

const MarketTrend = () => {

    const [trendNews, setTrendNews] = useState([]);
    const [brti, setBRTI] = useState({});
    const [coinDeal, setCoinDeal] = useState([]);
    const [candleChartData, setCandleChartData] = useState([]);

    const getCoinNews = async () => {
        try {
            const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getCoinNews');
            setTrendNews(response.data.items);
        } catch {
            console.log('에러');
        }
    }

    const getCoinInfo = async () => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinInfo?coin_uid=127`);
            console.log(response.data);
            setBRTI(response.data.data);
        } catch {
            console.log('error');
        }
    }

    const getCoinDeals = async () => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinDeals?coin_uid=127`);
            if (response.data.result === 'success') {
                setCoinDeal(response.data.data);
            } else {
                alert(`에러 : ${response.data.reason}`);
            }
        } catch {
            alert('시장 체결랑 조회 오류');
        }
    }
    const getCoinPriceInfo = async () => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinPriceInfo?coin_uid=127`);
            console.log(response.data);
            const formattedData = response.data.data.map(item => ({
                x: new Date(item.date).getTime(),
                y: [item.opening_price, item.closing_price, item.upper_limit_price, item.lower_limit_price, ]
            }))
            setCandleChartData(formattedData);
        } catch {
            console.log('error candlechart');
        }
    }

    useEffect(() => {
        getCoinNews();
        getCoinInfo();
        getCoinDeals();
        getCoinPriceInfo();
    }, [])

    useEffect(() => {
        if (candleChartData.length > 0) {
            const options = {
                series: [{
                    data: candleChartData
                }],
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            };

            const chart = new ApexCharts(document.querySelector("#candleChart"), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [candleChartData]);

    return (
        <>
            <MenuBar></MenuBar>
            <Container>
                <FlexBox>
                    <CoinScore>
                        <span>코인지수</span>
                        <CandleStick id="candleChart">

                        </CandleStick>
                    </CoinScore>
                </FlexBox>
                <div>
                    <span style={{
                        textAlign: 'left', display: 'block', padding: '0 30px',
                        fontWeight: 'bold', fontSize: '20px'
                    }}>뉴스</span>
                </div>
                <div>
                    <News>
                        <div>
                            <CoinNews />
                        </div>
                    </News>
                </div>
            </Container>
        </>
    )
}
export default MarketTrend;