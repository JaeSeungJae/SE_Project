import React, { useState } from "react";
import className from "classnames/bind";
import styles from "./DeleteProfile.module.css";
import InputBox from '../../../modules/inputBox/InputBox';
import MenuBar from "../../../modules/menuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = className.bind(styles)

const DeleteProfile = () => {
    const movePage = useNavigate();

    const handleEditProfile = () => {
        movePage("/mypage/editProfile")
    }

    const submitDelete = async (e) => {
        e.preventDefault();

        const fetchData = async () => {
            try {
                const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/deleteMember');
                if (response.data.result === 'success') {
                    alert('회원 탈퇴가 정상적으로 처리되었습니다.')
                    movePage('/login')
                } else {
                    alert('회원 탈퇴에 문제가 생겼습니다.');
                }
            } catch (error) {
                console.error('Error fetching data(DeleteMember):', error);
            }
        };
        fetchData();
    }

    return (
        <div>
            <MenuBar />
            <div className={cx("container")}>
                <div className={cx("button-container")}>
                    <button onClick={handleEditProfile} style={{ marginLeft: "10px" }}>정보 수정</button>
                    <button style={{ backgroundColor: "green" }}>회원 탈퇴</button>
                </div>
                <form className={cx("login-form")} onSubmit={submitDelete}>
                    <div className={cx("item-container")}>
                        <p>아래 버튼을 누르시면 회원 탈퇴를 할 수 있습니다.</p>
                    </div>

                    <div className={cx("item-container")}>
                        <button type='submit'>회원 탈퇴</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default DeleteProfile