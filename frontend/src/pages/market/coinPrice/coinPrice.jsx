import {React, useEffect, useState} from "react";
import styled from "styled-components";
import ApexCharts from "apexcharts";
import MenuBar from "../../../modules/menuBar/MenuBar";
import axios from "axios";

const CoinPriceSheet = styled.div`
    //display: flex;
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
        color : black;
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
    padding: 25px 20px;
    border-bottom: 1px solid #ccc;
`;

const CoinName = styled.span`
    font-weight: bold;
`;

const CoinPriceContent = styled.span`
    color: #333;
`;

const FlexBox = styled.div`
    display: flex;
`
const HeaderBox = styled.div`
    width: 100%;
    padding-bottom: 10px;
    //border-bottom: 1px solid #000;
    margin-bottom: 10px;

    span {
        display: block;
        text-align: left;
        font-weight: bold;
        margin: 5px 0;
        font-size: 20px;
        color : black;
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
        color : black;
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
    background-color: red;
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
    const [selectedCoin, setSelectedCoin] = useState(null);
    const getCoin = async () => {
        try {
            const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getCoinList');
            console.log(response.data);
            setCoins(response.data.data);
        }
        catch {
            console.log('error');
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

    useEffect(() => {
        getCoin();
    }, [])

    const [activeTab, setActiveTab] = useState("buy");
    
    return (
        <>
            <MenuBar/>
            <CoinPriceSheet>
                <HeaderBox>
                    <span>{selectedCoin.coin_name}</span>
                    <hr />
                    <span>{selectedCoin.current_unit_price}</span>
                </HeaderBox>
                <FlexBox>
                    <LeftContainer>
                        <PriceGraph>
                            <span>시세 그래프</span>
                            <CandleStick>
                                
                            </CandleStick>
                        </PriceGraph>
                        <PriceGraph>
                            <span>코인 주문(시장가)</span>
                            <OrderFormContainer>
                                <Tabs>
                                    <Tab active={activeTab === "buy"} onClick={() => setActiveTab("buy")}>
                                        매수
                                    </Tab>
                                    <Tab active={activeTab === "sell"} onClick={() => setActiveTab("sell")}>
                                        매도
                                    </Tab>
                                </Tabs>
                                <FormSection>
                                    <span>주문 가능</span>
                                    <span>현재 예치금 (KWR)</span>
                                </FormSection>
                                <FormSection>
                                    <span>주문 총액(KWR)</span>
                                    <Input type="text" placeholder="0" />
                                </FormSection>
                                <Button>{activeTab === "buy" ? "매수" : "매도"}</Button>
                            </OrderFormContainer>
                        </PriceGraph>
                    </LeftContainer>
                    <CoinList>
                        {coins.map((coin, index) => (
                            <CoinListItem key={index} onClick={() => getCoinInfo(coin.coin_uid)}>
                                <CoinName>{coin.coin_name}</CoinName>
                                <CoinPriceContent>{coin.current_unit_price}</CoinPriceContent>
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
                </CoinConclusion>
            </CoinPriceSheet>
        </>
    );
};

export default CoinPrice;
