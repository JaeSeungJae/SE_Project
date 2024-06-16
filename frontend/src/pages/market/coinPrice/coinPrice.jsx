import { React, useEffect, useState } from "react";
import styled from "styled-components";
import ApexCharts from "apexcharts";
import MenuBar from "../../../modules/menuBar/MenuBar";
import axios from "axios";

const CoinPriceSheet = styled.div`
    justify-content: space-between;
    width: calc(100% - 40px);
    height: 100%;
    background-color: #D0D0D0;
    border-radius: 10px;
    padding: 20px;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const PriceGraph = styled.div`
    background-color: #F0F0F0;
    border-radius: 10px;
    height: 400px;
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
`;

const CoinList = styled.div`
    width: 35%;
    background-color: #F0F0F0;
    border-radius: 10px;
    height: 880px;
    margin: 20px;
    padding: 20px;
    overflow-y: auto; // Add scroll if list is too long
    color: black;
`;

const CoinListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 20px;
    border-bottom: 1px solid #ccc;
`;

const CoinName = styled.span`
    font-weight: bold;
`;

const CoinPriceContent = styled.span`
    color: #333;
`;

const StarButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => (props.isFavorite ? "gold" : "gray")};
    font-size: 20px;
    margin-left: 10px;

    &:hover {
        color: gold;
    }
`;

const FlexBox = styled.div`
    display: flex;
`
const HeaderBox = styled.div`
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;

    span {
        display: block;
        text-align: left;
        font-weight: bold;
        margin: 5px 0;
        font-size: 20px;
        color: black;
    }
`

const CoinConclusion = styled.div`
    background-color: #F0F0F0;
    border-radius: 10px;
    height: 600px;
    margin: 20px 0;
    width: calc(100% - 60px);
    padding: 20px;
    overflow-y: auto;
    span {
        display: block;
        text-align: left;
        font-weight: bold;
        margin: 5px 10px;
        font-size: 16px;
        color: black;
    }
`

const ConclusionSection = styled.div`
    display: flex;
    color: red;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #F0F0F0;
    border-radius: 5px;
`

const OrderFormContainer = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    padding: 20px;
    width: 90%;
    margin: 20px auto;
    height: 70%;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: ${props => (props.active ? "red" : "black")};
    border-bottom: ${props => (props.active ? "2px solid red" : "1px solid black")};
`;
const Tab2 = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: ${props => (props.active ? "blue" : "black")};
    border-bottom: ${props => (props.active ? "2px solid blue" : "1px solid black")};
`;

const FormSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: #E0E0E0;
    border-radius: 5px;
`;

const Input = styled.input`
    flex: 2;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
`;

const CandleStick = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    height: 350px;
    margin: 20px 0;
    width: 100%;
`

const CoinPrice = () => {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('');
    const [orderAmount, setOrderAmount] = useState('');
    const [orderCount, setOrderCount] = useState('');
    const [coinDeal, setCoinDeal] = useState([]);
    const [activeTab, setActiveTab] = useState("buy");
    const [candleChartData, setCandleChartData] = useState([]);
    const [KRW, setKRW] = useState(0);
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = async (coinUid) => {
        try {
            if (favorites[coinUid]) {
                // 즐겨찾기 해제 API 호출
                const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/unsetCoinFavorite?coin_uid=${coinUid}`);
                if (response.data.result === 'success') {
                    setFavorites(prevFavorites => ({
                        ...prevFavorites,
                        [coinUid]: false
                    }));
                } else {
                    alert('즐겨찾기 해제 실패');
                }
            } else {
                // 즐겨찾기 설정 API 호출
                const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/setCoinFavorite?coin_uid=${coinUid}`);
                if (response.data.result === 'success') {
                    setFavorites(prevFavorites => ({
                        ...prevFavorites,
                        [coinUid]: true
                    }));
                } else {
                    alert('즐겨찾기 설정 실패');
                }
            }
        } catch (error) {
            alert('즐겨찾기 설정 중 오류 발생');
        }
    };

    const getCoin = async () => {
        try {
            const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getCoinList');
            console.log('코인 정보 : ', response.data.data);
            setCoins(response.data.data);
            // 즐겨찾기 상태 초기화
            const initialFavorites = {};
            response.data.data.forEach(coin => {
                if (coin.is_favorite == 0) {
                    initialFavorites[coin.coin_uid] = false;
                }
                else {
                    initialFavorites[coin.coin_uid] = true;
                }
            });
            console.log(initialFavorites);
            setFavorites(initialFavorites);
            if (response.data.data.length > 0) {
                handleCoinClick(response.data.data[0].coin_uid);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const getCoinInfo = async (coinUid) => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinInfo?coin_uid=${coinUid}`);
            console.log(response.data);
            setSelectedCoin(response.data.data);
        } catch {
            console.log('error');
        }
    }
    const getCoinPriceInfo = async (coinUid) => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinPriceInfo?coin_uid=${coinUid}`);
            console.log(response.data);
            const formattedData = response.data.data.map(item => ({
                x: new Date(item.date),
                y: [item.opening_price, item.upper_limit_price, item.lower_limit_price, item.closing_price]
            }))
            setCandleChartData(formattedData);
        } catch {
            console.log('error candlechart');
        }
    }
    const handleBuyCoin = async (coinUid, priceAmount) => {
        try {
            const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/buyCoin', {
                coin_uid: coinUid,
                price_amount: priceAmount
            });
            console.log(response.data);
            if (response.data.result === 'success') {
                alert('매수 주문이 성공적으로 접수되었습니다.');
            } else {
                alert(`매수 주문 실패: ${response.data.reason}`);
            }
        } catch (error) {
            console.log('error', error);
            alert('매수 주문 중 오류가 발생했습니다.');
        }
    }
    const handleSellCoin = async (coinUid, sellCount) => {
        try {
            const response = await axios.post(`http://bitcoin-kw.namisnt.com:8082/rest/sellCoin`, {
                coin_uid: coinUid,
                sell_count: sellCount
            });
            console.log(response.data);
            if (response.data.result === 'success') {
                alert('매도 주문이 성공적으로 접수되었습니다.');
            } else {
                alert(`매도 주문 실패: ${response.data.reason}`);
            }
        } catch (error) {
            console.log('error', error);
            alert('매도 주문 중 오류가 발생했습니다.');
        }
    }

    const getMyKRW = async () => {
        try {
            const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getMyKRW');
            setKRW(response.data.amount);
        } catch {
            alert('잔고 확인 에러');
        }
    }

    const getCoinDeals = async (coinUid) => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getCoinDeals?coin_uid=${coinUid}`);
            if (response.data.result === 'success') {
                setCoinDeal(response.data.data);
            } else {
                alert(`에러 : ${response.data.reason}`);
            }
        } catch {
            alert('시장 체결랑 조회 오류');
        }
    }

    const handleCoinClick = (coinUid) => {
        getCoinInfo(coinUid);
        getCoinPriceInfo(coinUid);
        getCoinDeals(coinUid);
    }

    useEffect(() => {
        getCoin();
        getMyKRW();
    }, [])

    useEffect(() => {
        getMyKRW();
    })

    useEffect(() => {
        if (coins.length > 0) {
            handleCoinClick(coins[0].coin_uid);
        }
    }, [coins]);

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
                },
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
            <MenuBar />
            <CoinPriceSheet>
                <HeaderBox>
                    <span style={{ fontWeight: 'bold' }}>{selectedCoin.coin_name}</span>
                    <hr />
                    <span>₩ {selectedCoin.current_unit_price}</span>
                </HeaderBox>
                <FlexBox>
                    <LeftContainer>
                        <PriceGraph>
                            <span>시세 그래프</span>
                            <CandleStick id="candleChart">

                            </CandleStick>
                        </PriceGraph>
                        <PriceGraph>
                            <span>코인 주문(시장가)</span>
                            <OrderFormContainer>
                                <Tabs>
                                    <Tab active={activeTab === "buy"} onClick={() => setActiveTab("buy")}>
                                        매수
                                    </Tab>
                                    <Tab2 active={activeTab === "sell"} onClick={() => setActiveTab("sell")}>
                                        매도
                                    </Tab2>
                                </Tabs>
                                <FormSection>
                                    <span>주문 가능</span>
                                    <span>{KRW}원</span>
                                </FormSection>
                                {activeTab === "buy" ? (
                                    <FormSection>
                                        <span>주문 총액(KWR)</span>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            value={orderAmount}
                                            onChange={(e) => setOrderAmount(e.target.value)}
                                        />
                                    </FormSection>
                                ) : (
                                    <FormSection>
                                        <span>주문 수량</span>
                                        <Input
                                            type="text"
                                            placeholder="0"
                                            value={orderCount}
                                            onChange={(e) => setOrderCount(e.target.value)}
                                        />
                                    </FormSection>
                                )}
                                <Button
                                    onClick={() => {
                                        if (selectedCoin) {
                                            if (activeTab === "buy") {
                                                handleBuyCoin(parseInt(selectedCoin.coin_uid), parseFloat(orderAmount));
                                            } else {
                                                handleSellCoin(parseInt(selectedCoin.coin_uid), parseFloat(orderCount));
                                            }
                                        } else {
                                            alert('코인을 선택하세요.');
                                        }
                                    }}
                                >
                                    {activeTab === "buy" ? "매수" : "매도"}
                                </Button>
                            </OrderFormContainer>
                        </PriceGraph>
                    </LeftContainer>
                    <CoinList>
                        {coins.map((coin, index) => (
                            <CoinListItem key={index} onClick={() =>
                                handleCoinClick(coin.coin_uid)
                            }>
                                <CoinName>{coin.coin_name}</CoinName>
                                <CoinPriceContent>{coin.current_unit_price}</CoinPriceContent>
                                <StarButton
                                    isFavorite={!!favorites[coin.coin_uid]}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(coin.coin_uid);
                                    }}
                                >
                                    ★
                                </StarButton>
                            </CoinListItem>
                        ))}
                    </CoinList>
                </FlexBox>
                <CoinConclusion>
                    <span>코인 체결 기록</span>
                    <ConclusionSection>
                        <span>체결 시간</span>
                        <span>체결 가격</span>
                        <span>체결량</span>
                        <span>체결금액</span>
                    </ConclusionSection>
                    {coinDeal.map((deal, index) => (
                        <ConclusionSection key={index}>
                            <span>{new Date(deal.contracted_time).toLocaleString()}</span>
                            <span>{deal.unit_price}원</span>
                            <span>{deal.unit_count}개</span>
                            <span>{deal.unit_price * deal.unit_count}원</span>
                        </ConclusionSection>
                    ))}
                </CoinConclusion>
            </CoinPriceSheet>
        </>
    );
};

export default CoinPrice;
