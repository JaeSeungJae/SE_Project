import React from "react";
import className from "classnames/bind"
import styles from "./HotArticle.module.css"
import { useState,useEffect } from "react";
import axios from "axios";

const cx = className.bind(styles);

const HotArticle = () =>{

    const [hotArticle_data,setHotArticle_Data] = useState([]);

    useEffect(()=>{
        axios.get("https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/getHotArticles")
            .then(response => {
                console.log(response.data.data)
                setHotArticle_Data(response.data.data)
            })
            .catch(error => {
                console.error("Error!!", error);
            });
    },[])


    return(
        <div className={cx("hot-article")}>
            <h3>핫게시글</h3>
            <table className={cx("article-table")}>
                <thead>
                    <tr>
                        <th className={cx("column-uid")}>번호</th>
                        <th className={cx("column-title")}>제목</th>
                        <th className={cx("column-hits")}>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {hotArticle_data.map((article)=>(
                        <tr key={article.article_uid}>
                            <td className={cx("column-uid")}>
                                <div>
                                    {article.article_uid}
                                </div>
                            </td>
                            <td className={cx("column-title")}>
                                <div>
                                    {article.title}
                                </div>
                            </td>
                            <td className={cx("column-hits")}>
                                <div>
                                    {article.hits}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default HotArticle;