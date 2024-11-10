import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import NavigationBar from './components/mainFooter/NavigationBar';
import KakaoLoginPage from './pages/auth/KakaoLoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import FindPage from './pages/FindPage';
import ChatListPage from './pages/ChatListPage';
import LandingPage from './pages/LandingPage';
import SelectSongPage from './pages/SelectSongPage';
import ProfilePage from './pages/ProfilePage';
import SrollAlbumPage from './pages/ScrollAlbumPage';
import SearchPage from './pages/SearchPage';
import AddSongPage from './pages/AddSongPage';
import SpotifyCallback from './pages/SpotifyCallback';
import { authenticateSpotify } from './api/spotifyApi';
import OtherHomePage from './pages/OtherHomePage';

function App() {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  useEffect(() => {
    // Kakao SDK 초기화하기
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoClientId);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
    // //Spotify Token 초기화하기
    // authenticateSpotify();
    // App 로드 시 spotifyAccessToken을 localStorage에 저장
    const accessToken =
      'BQC8K-EYj6pE0jJIzyH4T2gIvOeZCMm94xsirmI68d6NV4ZOacxjMjLR4phMy9PoQMV6It3-FzaYMyNcyBZXh20ehYqKKJK98OIayDyMIfAEQVvCXv2Lj8vDHvoZwr8eG0N4Rg2HSUapxA3SktnZj3IQDK8zv-FOiQTFheutlMlbqC5mKcTCNTrXoENi07Bi3Wyp6zDO4I8RPSgEFXXD9imh9LrSOa7NntCRvJNy';
    localStorage.setItem('spotifyAccessToken', accessToken);
    console.log('Spotify Access Token saved to localStorage');
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route element={<NavigationBar />}></Route> */}
        <Route path="home" element={<HomePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="find" element={<FindPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="kakao/callback" element={<KakaoLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="callback" element={<SpotifyCallback />} />
        <Route path="/selectsong" element={<SelectSongPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/albumscroll" element={<SrollAlbumPage />} />
        <Route path="/addsong" element={<AddSongPage />} />
        <Route path="/scanhome" element={<OtherHomePage />} />
        <Route path="/chatlist" element={<ChatListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
