import React, { useEffect, useState } from "react";
import MenuBar from "../../../modules/menuBar/MenuBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BoardList = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    height: 100%;
    width: calc(100% - 80px);
    margin: 20px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    span {
        display: block;
        text-align: left;
        font-weight: bold;
        margin: 5px 0;
        font-size: 16px;
    }
`;

const BoardSection = styled.div`
    display: flex;
    color: #DD1111;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px 50px;
    border-radius: 5px;
`;

const CoinList = styled.div`
    width: 100%;
    background-color: #F0F0F0;
    border-radius: 10px;
    height: 90%;
    margin: 20px;
    padding: 20px;
    overflow-y: auto;
`;

const CoinListItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 20px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
`;

const CoinName = styled.span`
    font-weight: bold;
    color: #333;
`;

const CoinPriceContent = styled.span`
    color: #333;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const PageButton = styled.button`
    margin: 0 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #DD1111;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    border: none;
    background-color: lightgreen;
    &:hover {
        background-color: #32CD32;
    }
`;

const Board = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [boardContents, setBoardContents] = useState([]);
    const listPerPage = 5;
    const navigate = useNavigate();

    const totalPages = Math.ceil(boardContents.length / listPerPage);
    const indexOfLastItem = currentPage * listPerPage;
    const indexOfFirstItem = indexOfLastItem - listPerPage;
    const currentItems = boardContents.slice(indexOfFirstItem, indexOfLastItem);

    const getBoardArticleList = async () => {
        try {
            const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getBoardArticleList?board_uid=1`);
            console.log('response data:' , response.data);
            setBoardContents(response.data.data);
        } catch {
            alert('게시판 내용 가져오기 에러');
        }
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    useEffect(() => {
        getBoardArticleList();
    }, []);

    return (
        <>
            <MenuBar></MenuBar>
            <BoardList>
                <BoardSection>
                    <CoinList>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 7px 10px 20px' }}>
                            <span>게시글 제목</span><span>조회수</span>
                        </div>
                        {currentItems.map((content, index) => (
                            <CoinListItem key={index} onClick={() => navigate(`/board/${content.article_uid}`, {
                                state: {
                                    id: content.article_uid
                                }
                            })}>
                                <CoinName>{content.title}</CoinName>
                                <CoinPriceContent>{content.hits}</CoinPriceContent>
                            </CoinListItem>
                        ))}
                        <Pagination>
                            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                                &lt;
                            </PageButton>
                            <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                                &gt;
                            </PageButton>
                        </Pagination>
                    </CoinList>
                </BoardSection>
                <Button onClick={() => navigate('/board/write')}>글 작성</Button>
            </BoardList>
        </>
    );
};

export default Board;
