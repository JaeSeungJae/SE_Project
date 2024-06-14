import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login'
import Join from './pages/auth/join/Join'
import CoinPrice from './pages/market/coinPrice/coinPrice';
import MarketTrend from './pages/market/marketTrend/marketTrend';
import Board from './pages/market/board/board';
import MainPage from './pages/mainPage/MainPage';
import EditProfile from './pages/myPage/editProfile/EditProfile';
import DeleteProfile from './pages/myPage/deleteProfile/DeleteProfile'
import Balance from './pages/investment/balance/Balance';
import BoardDetail from './pages/market/board/boardDetail';
import BoardWrite from './pages/market/board/boardWrite';
import BoardModify from './pages/market/board/boardModify';

import PageCheckAuth from './modules/checkAuth/PageCheckAuth';
import LoginCheckAuth from './modules/checkAuth/LoginCheckAuth';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <LoginCheckAuth>
            < Login />
          </LoginCheckAuth>
        } />
        <Route path="/join" element={
          <LoginCheckAuth>
            < Join />
          </LoginCheckAuth>
        } />
        <Route path="/coinprice" element={
          <PageCheckAuth>
            < CoinPrice />
          </PageCheckAuth>
        } />
        <Route path="/markettrend" element={
          <PageCheckAuth>
            < MarketTrend />
          </PageCheckAuth>
        } />
        <Route path="/board" element={
          <PageCheckAuth>
            < Board />
          </PageCheckAuth>
        } />
        <Route path="/mainpage" element={
          <PageCheckAuth>
            < MainPage />
          </PageCheckAuth>
        } />
        <Route path="/board/:id" element={
          <PageCheckAuth>
            < BoardDetail />
          </PageCheckAuth>
        } />
        <Route path="/board/write" element={
          <PageCheckAuth>
            < BoardWrite />
          </PageCheckAuth>
        } />
        <Route path="/board/modify" element={
          <PageCheckAuth>
            < BoardModify />
          </PageCheckAuth>
        } />
        <Route path="/" element={
          <PageCheckAuth>
            < MainPage />
          </PageCheckAuth>
        } />
        <Route path="/mypage/editProfile" element={
          <PageCheckAuth>
            <EditProfile />
          </PageCheckAuth>
        } />
        <Route path="/mypage/deleteProfile" element={
          <PageCheckAuth>
            <DeleteProfile />
          </PageCheckAuth>
        } />
        <Route path="/investment/balance" element={
          <PageCheckAuth>
            <Balance />
          </PageCheckAuth>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
