import kakaoLoginImage from '../../assets/kakao_login.png';

const LoginPage = () => {
  const restApiKey = import.meta.env.VITE_REST_API_KEY;
  const redirectUri = 'http://localhost:5173/kakao/callback';

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={kakaoLoginImage}
        alt="Kakao Login"
        onClick={handleKakaoLogin}
        className="cursor-pointer"
      />
    </div>
  );
};

export default LoginPage;
