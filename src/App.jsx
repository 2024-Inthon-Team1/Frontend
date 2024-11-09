import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import NavigationBar from './components/mainFooter/NavigationBar';
import LoginPage from './pages/auth/LoginPage';
import KakaoLoginPage from './pages/auth/KakaoLoginPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import FindPage from './pages/FindPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

function App() {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  useEffect(() => {
    // Kakao SDK 초기화하기
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoClientId);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path="home" element={<HomePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="find" element={<FindPage />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="kakao/callback" element={<KakaoLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
