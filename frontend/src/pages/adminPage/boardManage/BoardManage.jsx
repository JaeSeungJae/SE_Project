import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./BoardManage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = className.bind(styles)

const BoardManage = () => {
    const movePage = useNavigate();
    const handleUserManage = () => {
        movePage("/adminPage/userManage")
    }

    const [articleData, setArticleData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getBoardArticleList?board_uid=1`);
                setArticleData(response.data.data)
            }catch(error){
                alert("게시글을 불러오는데 문제가 발생했습니다.");
                window.location.reload();
            }
        }
        fetchData();
    },[])

    const handleDelete = async (uid) => {
        try {
            let article_uid = parseInt(uid)
            const response = await axios.post(`http://bitcoin-kw.namisnt.com:8082/rest/deleteArticle_admin`,{
                article_uid : article_uid
            });
            if (response.data.result === 'success') {
                alert("게시글 삭제가 정상적으로 이루어졌습니다.")
                window.location.reload();
            } else {
                alert("게시글 삭제에 문제가 생겼습니다.")
                window.location.reload();
            }
        } catch (error) {
            alert("에러: 게시글 삭제에 문제가 생겼습니다.")
            window.location.reload();
        }
    };

    return (
        <div>
            <div className={cx("container")}>
                <h1>
                    관리자 페이지
                </h1>
                <div className={cx("button-container")}>
                    <button onClick={handleUserManage} style={{ marginLeft: "10px" }}>회원 관리</button>
                    <button style={{ backgroundColor: "green" }}>게시글 관리</button>
                </div>
            </div>
            <div className={cx("board-container")}>
                <table className={cx("board-table")}>
                    <thead>
                        <tr>
                            <th className={cx("board-title")}>
                                게시글 제목
                            </th>
                            <th className={cx("board-hits")}>
                                조회수
                            </th>
                            <th className={cx("board-author")}>
                                작성자
                            </th>
                            <th className={cx("board-delete")}>
                                삭제
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articleData.map((board) => (
                            <tr key={board.article_uid}>
                                <td className={cx("board-title")}>
                                    <div>
                                        {board.title}
                                    </div>
                                </td>
                                <td className={cx("board-hits")}>
                                    <div>
                                        {board.hits}
                                    </div>
                                </td>
                                <td className={cx("board-author")}>
                                    <div>
                                        {board.user_nickname}
                                    </div>
                                </td>
                                <td className={cx("board-delete")}>
                                    <div>
                                        <button onClick={()=>handleDelete(board.article_uid)}>삭제</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BoardManage