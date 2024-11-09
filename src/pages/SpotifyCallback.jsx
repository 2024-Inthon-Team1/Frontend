import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        localStorage.setItem('spotifyAccessToken', token); // accessToken 저장
        navigate(-1);
      }
    }
  }, [navigate]);

  return <div>토큰 처리 중...</div>;
};

export default SpotifyCallback;
