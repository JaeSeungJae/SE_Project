import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./EditProfile.module.css";
import InputBox from '../../../modules/inputBox/InputBox';
import MenuBar from "../../../modules/menuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import {getUserInfo} from "../../../hooks/getUserInfo/getUserInfo";
import axios from "axios";

const cx = className.bind(styles)

const EditProfile = () => {
    const movePage = useNavigate();
    const handleDeleteProfile = () =>{
        movePage("/mypage/deleteProfile")
    }


    const [userID, setUserID] = useState('');
    const [userPW, setUserPW] = useState('');
    const [userRePW, setUserRePW] = useState('');
    const [userName, setUserName] = useState('');
    const [userNickname, setUserNickname] = useState('');

    const submitEdit = async (e) => {
        e.preventDefault();
        if (userPW != userRePW) {
            alert('패스워드가 일치하지 않습니다');
            return;
        }
        axios.post('https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/modifyMemberInfo',{
            pw: {userPW},
            name: {userName},
            nickname: {userNickname},
          })
          .then(response =>{
            if(response.data.result === 'success'){
              alert('회원정보 수정이 정상적으로 처리되었습니다.')
              movePage('/mainpage')
            }else{
              alert('회원정보 수정에 문제가 생겼습니다.');
            }
          })
          .catch(error =>{
            console.error("Error!!",error);
          });
    }

    useEffect(()=>{
        const checkName = async () =>{
            const userInfo = await getUserInfo();
            
            setUserID(userInfo.data.id);
        };
        checkName();
    },[])

    return (
        <div>
            <MenuBar />
            <div className={cx("container")}>
                <div className={cx("button-container")}>
                    <button style={{backgroundColor:"green", marginLeft:"10px"}}>정보 수정</button>
                    <button onClick={handleDeleteProfile}>회원 탈퇴</button>
                </div>
                <form className={cx("login-form")} onSubmit={submitEdit}>
                    <div className={cx("item-container")}>
                        <InputBox boxName="ID" boxType="text" disabled value={userID} required />
                        <InputBox boxName="Password" boxType="password" boxPlaceHolder="패스워드를 입력하세요" value={userPW} onChange={(e) => setUserPW(e.target.value)} required />
                        <InputBox boxName="Re. Password" boxType="password" boxPlaceHolder="패스워드를 재입력하세요" value={userRePW} onChange={(e) => setUserRePW(e.target.value)} required />
                    </div>
                    <hr style={{ width: "500px" }}></hr>
                    <div className={cx("item-container")}>
                        <h2>회원정보</h2>
                        <InputBox boxName="이름" boxType="text" boxPlaceHolder="이름을 입력하세요" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        <InputBox boxName="별명" boxType="text" boxPlaceHolder="별명을 입력하세요" value={userNickname} onChange={(e) => setUserNickname(e.target.value)} required />
                    </div>
                    <div className={cx("item-container")}>
                        <button type='submit'>정보 수정</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditProfile