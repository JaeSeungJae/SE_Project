import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
    color: black;
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
        background-color: lightgreen;
    }
`;

const BoardDetail = () => {
    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [modifiedComment, setModifiedComment] = useState(null);
    const [modCommentContent, setModCommentContent] = useState('');

    const getBoardArticle = async () => {
        const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getBoardArticle?article_uid=${id}`)
        console.log('response data:', response.data);
        setArticle(response.data.article);
        setComments(response.data.comments);
    }

    const deleteArticle = async (uid) => {
        try {
            console.log(uid);
            const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/deleteArticle', {
                article_uid: uid
            });
            if (response.data.result === 'success') {
                alert('게시글이 삭제되었습니다.');
                navigate('/board');
            } else {
                alert(`게시글 삭제 실패: ${response.data.reason}`);
            }
        } catch {
            alert('에러 발생');
        }
    }

    const writeComment = async (uid, content) => {
        try {
            const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/writeComment', {
                article_uid: uid,
                content: content,
            });
            if (response.data.result === 'success') {
                alert('댓글이 등록되었습니다.');
                window.location.reload();
            } else {
                alert(`댓글 등록 실패: ${response.data.reason}`);
            }
        } catch {
            alert('에러 발생');
        }
    }

    const deleteComment = async (cmt_uid) => {
        try {
            const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/deleteComment', {
                cmt_uid: cmt_uid
            });
            if (response.data.result === 'success') {
                alert('댓글이 삭제되었습니다.');
                window.location.reload();
            } else {
                alert(`댓글 삭제 실패: ${response.data.reason}`);
            }
        } catch (error) {
            alert('댓글 삭제 중 오류가 발생했습니다.');
        }
    }

    const modifyComment = async (uid, content) => {
        try {
            const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/updateComment', {
                cmt_uid: uid,
                content: content
            })
            if (response.data.result === 'success') {
                alert('댓글이 수정되었습니다.');
                window.location.reload();
            } else {
                alert(`댓글 수정 실패: ${response.data.reason}`);
            }
        } catch {
            alert('에러 발생');
        }
    }

    useEffect(() => {
        getBoardArticle();
    }, [])

    return (
        <>
            <BoardList>
                <BoardSection height={50}>
                    <FlexBox>
                        <StyledSpan>제목 : {article.title}</StyledSpan>
                        <StyledSpan>작성자 : {article.user_nickname}</StyledSpan>
                        <StyledSpan>조회수 : {article.hits}</StyledSpan>
                    </FlexBox>
                </BoardSection>
                <BoardSection height={300}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>게시글 내용</span>
                        <div>
                            <span style={{ cursor: 'pointer', marginRight: '10px' }} 
                            onClick={() => navigate('/board/modify', {
                                state: {
                                    article_uid: article.article_uid
                                }
                            })}>수정</span>
                            <span style={{ cursor: 'pointer' }}
                            onClick={() => { deleteArticle(parseInt(id)) }}>삭제</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>{article.content}</div>
                </BoardSection>
                <BoardSection height={400}>
                    <FlexBox>
                        <StyledSpan>댓글 목록</StyledSpan>
                    </FlexBox>
                    {comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            <CommentBox>
                                <FlexBox>
                                    <span>{comment.user_nickname} : </span>
                                    <span>{comment.content}</span>
                                    <div>
                                        <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setModifiedComment(comment.comment_uid)}>수정</span>
                                        <span style={{ cursor: 'pointer' }} onClick={() => deleteComment(parseInt(comment.comment_uid))}>삭제</span>
                                    </div>
                                </FlexBox>
                            </CommentBox>
                            {modifiedComment === comment.comment_uid && <CommentInputBox>
                                <CommentInput placeholder="댓글 수정"
                                    value={modCommentContent}
                                    onChange={(e) => setModCommentContent(e.target.value)} />
                                <SubmitButton onClick={() => modifyComment(parseInt(comment.comment_uid), modCommentContent)}>등록</SubmitButton>
                            </CommentInputBox>}
                        </React.Fragment>
                    ))}
                    <CommentInputBox>
                        <CommentInput placeholder="댓글 작성"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)} />
                        <SubmitButton onClick={() => writeComment(parseInt(id), newComment)}>등록</SubmitButton>
                    </CommentInputBox>
                </BoardSection>
                <ListButton onClick={() => navigate('/board')}>목록</ListButton>
            </BoardList>
        </>
    );
};

export default BoardDetail;
