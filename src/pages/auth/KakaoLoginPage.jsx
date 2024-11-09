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
          setCookies(result.accessToken, result.refreshToken);
          dispatch(setUserId(result.userId));
          navigate('/home');
        } else {
          console.error('Failed to authenticate user');
          navigate('/');
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
        navigate('/');
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
