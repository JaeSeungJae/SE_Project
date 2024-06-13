import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import axios from 'axios';
import styles from "./CoinNews.module.css";

const cx = className.bind(styles)

const CoinNews = () => {
    const [newsData,setNewsData] =useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getCoinNews');
                console.log(response.data.items);
                setNewsData(response.data.items)
            }catch(error){
                console.error('Error fetching data(CoinNews):',error);
            }
        };
        fetchData();
    },[])


    const handleClick =(link)=>{
        window.open(link, '_blank');
    }


    const removeHtmlTags = (text) => {
        text = removeHtmlEntities(text);
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    };
    const removeHtmlEntities = (text) =>{
        const entities = {
            '&quot;': '"',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            // 필요한 다른 엔티티들을 추가할 수 있습니다.
          };
        
          return text.replace(/&quot;|&amp;|&lt;|&gt;/g, match => entities[match]);
    }

    return (
        <div className={cx("coin-news")}>
            <h3>
                주요뉴스
            </h3>
            <div className={cx("news-list")}>
                {newsData.map((news, index) => (
                    <div key={index} className={cx("news-frame")} onClick={() => handleClick(news.originallink)}>

                        <h3>{removeHtmlTags(news.title)}</h3>
                        <p>{removeHtmlTags(news.description)}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoinNews