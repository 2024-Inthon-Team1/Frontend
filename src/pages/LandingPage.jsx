import GreenTape from '../assets/Tapes/GreenTape.png';
import BlueTape from '../assets/Tapes/BlueTape.png';
import RedTape from '../assets/Tapes/RedTape.png';
import IndigoTape from '../assets/Tapes/IndigoTape.png';
import PinkTape from '../assets/Tapes/PinkTape.png';
import kakaoLoginImage from '../assets/kakaoLogin.svg';

function LandingPage() {
  const restApiKey = import.meta.env.VITE_REST_API_KEY;
  const redirectUri = 'http://localhost:5173/kakao/callback';

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-[100vh] overflow-hidden relative bg-none">
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="rotate-[-45deg] w-[250%] h-[200%] relative z-0">
        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 500 }).map((_, index) => (
            <img
              src={GreenTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`green-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={RedTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`red-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={IndigoTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`indigo-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={PinkTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`pink-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={BlueTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`blue-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute" style={{ top: '30vh', zIndex: 20 }}>
        <div className="px-[20px] mt-[50px] font-0logo text-[50px] text-[#ff8000]">
          3.81mm
        </div>
        <div className="font-0logo text-[20px] text-[#ff8000]">
          SHOW YOUR TASTE
        </div>
      </div>
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src={kakaoLoginImage}
          alt="Kakao Login"
          onClick={handleKakaoLogin}
          className="cursor-pointer"
        />
      </div> */}
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src={kakaoLoginImage}
          alt="Kakao Login"
          onClick={handleKakaoLogin}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default LandingPage;
