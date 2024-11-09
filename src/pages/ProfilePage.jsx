import { FaAngleLeft } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa6';
import { FaBellSlash } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(prevState => !prevState);
  };

  return (
    <div className="bg-[#eee] h-screen w-full">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[80px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer text-[#aaa]"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              프로필 정보
            </div>
          </div>
          <div className="w-[120px] h-[120px] bg-[#aaa] rounded-full mt-[80px] mb-[40px]"></div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]">
            <span className="text-[20px] font-7bold">닉네임</span>
            <span className="text-[20px] font-5medium">안지형</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]">
            <span className="text-[20px] font-7bold">성별</span>
            <span className="text-[20px] font-5medium">여성</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]">
            <span className="text-[20px] font-7bold">생일</span>
            <span className="text-[20px] font-5medium">2002.05.20</span>
          </div>

          <div
            onClick={handleNotificationToggle}
            className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]"
          >
            <span className="text-[20px] font-7bold">알림설정</span>
            {isNotificationEnabled ? (
              <FaBell className="text-[20px]" />
            ) : (
              <FaBellSlash className="text-[24px]" />
            )}
          </div>
          {/* <div
            onClick={() => {}}
            className="w-full flex flex-col text-left px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]"
          >
            <span className="text-[20px] font-7bold mb-[10px]">공지사항</span>
            <span className="text-[20px] font-7bold">문의/신고</span>
          </div> */}
          <div
            onClick={() => {}}
            className="text-left text-[#aaa] text-[20px] font-7bold mt-[10px]"
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
