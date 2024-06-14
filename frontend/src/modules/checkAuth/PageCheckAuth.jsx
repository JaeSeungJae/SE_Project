import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageCheckAuth = ({ children }) => {
  const movePage = useNavigate();

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getUserInfo');
        console.log(response.data);
        if (response.data.logged !== true) {
          movePage('/login')
        }
      } catch (error) {
        movePage('/login');
      }
    };

    checkUserInfo();
  }, [movePage]);

  return <>{children}</>;
};

export default PageCheckAuth;
