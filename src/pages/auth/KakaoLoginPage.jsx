import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithKakao } from '../../api/auth';

const KakaoLoginPage = () => {
  const navigate = useNavigate();

  const fetchAuthentication = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log(code);
      try {
        const result = await authenticateWithKakao(code);
        console.log(result);
        // if (result) {
        //   console.log('User authenticated successfully');
        //   navigate('/home');
        // } else {
        //   console.error('Failed to authenticate user');
        //   navigate('/'); // 실패 시 로그인 페이지로 리다이렉트
        // }
      } catch (error) {
        console.error('Error authenticating user:', error);
        navigate('/'); // 오류 발생 시 로그인 페이지로 리다이렉트
      }
    }
    navigate('/home');
  };

  useEffect(() => {
    fetchAuthentication();
  }, [navigate]);

  return (
    <div>
      <p>로그인 중</p>
    </div>
  );
};

export default KakaoLoginPage;
