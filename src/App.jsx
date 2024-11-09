import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import KakaoLoginPage from './pages/auth/KakaoLoginPage';
import HomePage from './pages/HomePage';

function App() {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoClientId);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="kakao/callback" element={<KakaoLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
