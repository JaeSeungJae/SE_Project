import React, { useState } from 'react';
import className from "classnames/bind"
import styles from "./Join.module.css"
import InputBox from '../../../modules/inputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = className.bind(styles)

const Join = () => {
  const movePage = useNavigate();


  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [userRePW, setUserRePW] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');

  const submitJoin = async (e) => {
    e.preventDefault();
    console.log(`${userID} ${userPW} ${userRePW} ${userName} ${userNickname}`)
    if (userPW != userRePW) {
      alert('패스워드가 일치하지 않습니다');
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/registerMember', {
          id: `${userID}`,
          pw: `${userPW}`,
          name: `${userName}`,
          nickname: `${userNickname}`,
        });
        if(response.data.result === 'success'){
          alert('회원가입이 정상적으로 처리되었습니다.');
          movePage('/login');
        }else{
          alert('회원가입에 문제가 생겼습니다.');
        }
      } catch (error) {
        console.error('Error fetching data(Join):', error);
      }
    };
    fetchData();
  };

  return (
    <div>
      <div className={cx("container")}>
        <h1>회원 가입</h1>
        <form className={cx("login-form")} onSubmit={submitJoin}>
          <div className={cx("container")}>
            <InputBox boxName="ID" boxType="text" boxPlaceHolder="ID를 입력하세요" value={userID} onChange={(e) => setUserID(e.target.value)} required />
            <InputBox boxName="Password" boxType="password" boxPlaceHolder="패스워드를 입력하세요" value={userPW} onChange={(e) => setUserPW(e.target.value)} required />
            <InputBox boxName="Re. Password" boxType="password" boxPlaceHolder="패스워드를 재입력하세요" value={userRePW} onChange={(e) => setUserRePW(e.target.value)} required />
          </div>
          <hr style={{ width: "500px" }}></hr>
          <div className={cx("container")}>
            <h2>회원정보</h2>
            <InputBox boxName="이름" boxType="text" boxPlaceHolder="이름을 입력하세요" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <InputBox boxName="별명" boxType="text" boxPlaceHolder="별명을 입력하세요" value={userNickname} onChange={(e) => setUserNickname(e.target.value)} required />
          </div>
          <div className={cx("container")}>
            <button type='submit'>Join</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Join;