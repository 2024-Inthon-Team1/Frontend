import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithKakao } from '../../api/auth';

const KakaoLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthentication = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        console.log(code);
        try {
          const result = await authenticateWithKakao(code);
          if (result) {
            console.log('User authenticated successfully');
            navigate('/home');
          } else {
            console.error('Failed to authenticate user');
          }
        } catch (error) {
          console.error('Error authenticating user:', error);
        }
      }
    };

    fetchAuthentication();
  }, [navigate]);

  return (
    <div>
      <p>로그인 중</p>
    </div>
  );
};

export default KakaoLoginPage;
