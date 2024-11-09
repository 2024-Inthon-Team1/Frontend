import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      const expiresIn = params.get('expires_in');

      if (token && expiresIn) {
        localStorage.setItem('spotifyAccessToken', token);
        localStorage.setItem(
          'spotifyTokenExpiry',
          dayjs().add(expiresIn, 'second').toISOString()
        );
        navigate(-1);
      }
    }
  }, [navigate]);

  return <div>토큰 처리 중...</div>;
};

export default SpotifyCallback;
