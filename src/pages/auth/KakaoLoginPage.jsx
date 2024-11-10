// src/components/KakaoLoginPage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateWithKakao } from '../../api/auth';
import { setUserId } from '../../redux/userSlice';

import { setCookies } from '../../api/token';

const KakaoLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAuthentication = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log(code);
      try {
        const result = await authenticateWithKakao(code);
        if (result) {
          console.log(result.data.accessToken, result.data.refreshToken);
          setCookies(result.data.accessToken, result.data.refreshToken);
          dispatch(setUserId(result.data.userId));
          if (result.data.isSignedup) {
            navigate('/home');
          } else {
            navigate('/register');
          }
        } else {
          console.error('Failed to authenticate user');
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
      }
    }
  };

  useEffect(() => {
    fetchAuthentication();
  }, [navigate]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
};

export default KakaoLoginPage;
