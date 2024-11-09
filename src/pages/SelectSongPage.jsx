import { useLocation } from 'react-router-dom';
import { IoHeadset } from 'react-icons/io5';

const SelectSongPage = () => {
  const location = useLocation();
  const { gender, birthDate, nickname, profileImage } = location.state || {};

  return (
    <div className="bg-gray-200 w-full h-screen p-7 flex flex-col relative">
      <div className="flex-grow">
        <div className="font-0logo text-[48px] text-orange-500 text-left pt-8">
          3.81mm
        </div>
        <div className="font-8extrabold text-2xl text-left pb-2">
          대표곡을 골라주세요
        </div>
        <div className="flex justify-center mt-[150px]">
          <IoHeadset
            className="text-[120px]"
            style={{
              animation: 'bounceScaleColor 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      <div className="w-full mt-5" style={{ marginTop: '20px' }}>
        <button className="w-full h-12 rounded-xl bg-[#219B9D] font-7bold text-[#fff] text-[20px]">
          회원가입
        </button>
      </div>

      {/* 인라인 스타일로 애니메이션 정의 */}
      <style>
        {`
          @keyframes bounceScaleColor {
            0%, 100% {
              transform: scale(1);
              color: #374151; /* Dark Gray */
            }
            50% {
              transform: scale(1.2);
              color: #9CA3AF; /* Light Gray */
            }
          }
        `}
      </style>
    </div>
  );
};

export default SelectSongPage;
