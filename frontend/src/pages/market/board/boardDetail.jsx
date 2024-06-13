import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const BoardList = styled.div`
    background-color: #D0D0D0;
    border-radius: 10px;
    height: 100%;
    width: calc(100% - 80px);
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BoardSection = styled.div`
    background-color: #F0F0F0;
    border-radius: 10px;
    height: ${(props) => props.height}px;
    width: 95%;
    padding: 20px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    margin: 5px 0;
    padding: 5px;
    font-size: 16px;
`;

const CommentBox = styled.div`
    background-color: #E0E0E0;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
`;

const CommentInputBox = styled.div`
    display: flex;
    margin: 10px 0;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    background-color: lightgreen;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    
`;

const ListButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #F0F0F0;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: lightgreen; /* Change this color to whatever you prefer for the hover state */
    }
`;


const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <BoardList>
                <BoardSection height={50}>
                    <FlexBox>
                        <StyledSpan>게시글 제목</StyledSpan>
                        <StyledSpan>작성자</StyledSpan>
                        <StyledSpan>조회수</StyledSpan>
                    </FlexBox>
                </BoardSection>
                <BoardSection height={300}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>게시글 내용</span>
                        <div>
                            <span style={{ cursor: 'pointer', marginRight: '10px' }} 
                            onClick={()=>navigate('/board/modify')}>수정</span>
                            <span style={{ cursor: 'pointer' }}>삭제</span>
                        </div>
                    </div>
                </BoardSection>
                <BoardSection height={400}>
                    <FlexBox>
                    <StyledSpan>댓글 목록</StyledSpan>
                    <div>
                        <span style={{ cursor: 'pointer', marginRight: '10px' }}>수정</span>
                        <span style={{ cursor: 'pointer' }}>삭제</span>
                    </div>
                    </FlexBox>
                    <CommentBox>
                        <FlexBox>
                            <span>댓글 1</span>
                            <span>댓글 작성자 1</span>
                            
                        </FlexBox>
                    </CommentBox>
                    <CommentInputBox>
                        <CommentInput placeholder="댓글 작성" />
                        <SubmitButton>등록</SubmitButton>
                    </CommentInputBox>
                </BoardSection>
                <ListButton onClick={()=>navigate('/board')}>목록</ListButton>
            </BoardList>
        </>
    );
};

export default BoardDetail;
