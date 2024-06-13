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
import BoardDetail from './pages/market/board/boardDetail';
import BoardWrite from './pages/market/board/boardWrite';
import BoardModify from './pages/market/board/boardModify';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/join" element={< Join />} />
        <Route path="/coinprice" element={< CoinPrice />} />
        <Route path="/markettrend" element={< MarketTrend />} />
        <Route path="/board" element={< Board />} />
        <Route path="/mainpage" element={< MainPage />} />
        <Route path="/board/:id" element={< BoardDetail />} />
        <Route path="/board/write" element={< BoardWrite />} />
        <Route path="/board/modify" element={< BoardModify />} />
        <Route path="/" element={< MainPage />} />
        <Route path="/mypage/editProfile" element={<EditProfile/>}/>
        <Route path="/mypage/deleteProfile" element={<DeleteProfile/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
