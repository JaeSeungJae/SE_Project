import React, { useState } from 'react';
import className from "classnames/bind"
import styles from "./Login.module.css"
import InputBox from '../../../modules/inputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = className.bind(styles)

const Login = () => {
  const movePage = useNavigate();
  const handleJoin = () => {
    movePage('/join');
  }

  const [id, setID] = useState('');
  const [pw, setPW] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await axios.post('http://bitcoin-kw.namisnt.com:8082/rest/login', {
          id,
          pw
        });
        if(response.data.result === 'success'){
          movePage('/mainpage');
        }else{
          alert('Login failed. Please try again');
        }
      } catch (error) {
        console.error('Error fetching data(Login):', error);
      }
    };
    fetchData();
  };


  return (
    <div>
      <div className={cx("container")}>
        <h1>회원 로그인</h1>
        <form className={cx("login-form")} onSubmit={submitLogin}>
          <InputBox boxName="ID" boxType="text" boxPlaceHolder="ID를 입력하세요" value={id} onChange={(e) => setID(e.target.value)} required />
          <InputBox boxName="Password" boxType="password" boxPlaceHolder="패스워드를 입력하세요" value={pw} onChange={(e) => setPW(e.target.value)} required/>
          <div>
            <button type='submit'>Login</button>
            <button onClick={handleJoin}>Join</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;