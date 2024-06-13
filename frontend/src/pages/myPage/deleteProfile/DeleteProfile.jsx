import React, { useState } from "react";
import className from "classnames/bind";
import styles from "./DeleteProfile.module.css";
import InputBox from '../../../modules/inputBox/InputBox';
import MenuBar from "../../../modules/menuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = className.bind(styles)

const EditProfile = () => {
    const movePage = useNavigate();

    const handleEditProgile = () => {
        movePage("/mypage/editProfile")
    }

    const submitDelete = async (e) => {
        e.preventDefault();

        axios.post('https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/deleteMember')
            .then(response => {
                if (response.data.result === 'success') {
                    alert('회원 탈퇴가 정상적으로 처리되었습니다.')
                    movePage('/login')
                } else {
                    alert('회원 탈퇴에 문제가 생겼습니다.');
                }
            })
            .catch(error => {
                console.error("Error!!", error);
            });
    }

    return (
        <div>
            <MenuBar />
            <div className={cx("container")}>
                <div className={cx("button-container")}>
                    <button onClick={handleEditProgile} style={{ marginLeft: "10px" }}>정보 수정</button>
                    <button style={{ backgroundColor: "green" }}>회원 탈퇴</button>
                </div>
                <form className={cx("login-form")} onSubmit={submitDelete}>
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