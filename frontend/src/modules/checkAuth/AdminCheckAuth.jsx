import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginCheckAuth = ({ children }) => {
  const movePage = useNavigate();

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getUserInfo');
        console.log(response.data);
        if (response.data.logged !== true || response.data.data.level === 0) {
            alert("접근 권한이 없거나 잘못된 정보입니다.");
            movePage('/mainpage');
        }
      } catch (error) {
        movePage('/adminPage/userManage')
      }
    };

    checkUserInfo();
  }, [movePage]);

  return <>{children}</>;
};

export default LoginCheckAuth;
