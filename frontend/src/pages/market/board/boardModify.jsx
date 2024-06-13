import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    width: 90%;
    padding: 20px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-weight: bold;
    width: 100px;
    text-align: left;
    margin-right: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    height: 200px;
`;

const SubmitButton = styled.button`
    background-color: lightgreen;
    border: none;
    border-radius: 5px;
    margin-top : 100px;
    padding: 10px 20px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
        background-color: #32CD32;
    }
`;

const BoardModify = () => {
    const navigate = useNavigate();
    return (
        <>
            <BoardList>
                <BoardSection>
                    <FlexBox>
                        <Label>게시글 제목</Label>
                        <Input type="text" placeholder="기존 게시글 제목 수정" />
                    </FlexBox>
                    <FlexBox>
                        <Label>게시글 내용</Label>
                        <TextArea placeholder="기존 게시글 내용 수정" />
                    </FlexBox>
                </BoardSection>
                <SubmitButton onClick={()=>navigate('/board')}>수정</SubmitButton>
                {/* 추후 navigate('/board')를 api로 */}
            </BoardList>
        </>
    );
};

export default BoardModify;