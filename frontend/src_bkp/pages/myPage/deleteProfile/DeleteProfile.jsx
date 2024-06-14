import React, { useState } from "react";
import className from "classnames/bind";
import styles from "./DeleteProfile.module.css";
import InputBox from '../../../modules/inputBox/InputBox';
import MenuBar from "../../../modules/menuBar/MenuBar";
import { useNavigate } from "react-router-dom";

const cx = className.bind(styles)

const EditProfile = () => {
    const movePage = useNavigate();

    const handleEditProgile = () =>{
        movePage("/mypage/editProfile")
    }


    const [userID, setUserID] = useState('');
    const [userPW, setUserPW] = useState('');
    const [userRePW, setUserRePW] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userNickname, setUserNickname] = useState('');

    const submitJoin = async (e) => {
        e.preventDefault();
        console.log(`${userID} ${userPW} ${userRePW} ${userName} ${userPhone} ${userNickname}`)
        if (userPW != userRePW) {
            alert('패스워드가 일치하지 않습니다??');
            return;
        }
    }

    return (
        <div>
            <MenuBar />
            <div className={cx("container")}>
                <div className={cx("button-container")}>
                    <button onClick={handleEditProgile} style={{marginLeft:"10px"}}>정보 수정</button>
                    <button style={{backgroundColor:"green"}}>회원 탈퇴</button>
                </div>
                <form className={cx("login-form")} onSubmit={submitJoin}>
                    <div className={cx("item-container")}>
                        <p>진짜 회원 탈퇴 할겨?</p>
                    </div>
                    
                    <div className={cx("item-container")}>
                        <button type='submit'>회원 탈퇴</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditProfile