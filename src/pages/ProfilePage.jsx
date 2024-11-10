import { FaAngleLeft, FaBell, FaBellSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/mainFooter/NavigationBar';
import { getUserProfile, getUserProfileImage } from '../api/user';
import BasicUser from '../assets/BasicUser.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);

  const fetchData = async () => {
    const data = await getUserProfile();
    setData(data);

    const imageData = await getUserProfileImage();
    setImage(imageData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#eee] min-h-screen w-full relative">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[30px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer text-[#aaa]"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              프로필 정보
            </div>
          </div>
          <div className="w-[120px] h-[120px] bg-[#aaa] rounded-full mt-[80px] mb-[40px]">
            <img
              src={image || BasicUser}
              alt="User Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[20px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">닉네임</span>
            <span className="text-[20px] font-5medium">{data?.username}</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[20px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">성별</span>
            <span className="text-[20px] font-5medium">{data?.sex}</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[20px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">생일</span>
            <span className="text-[20px] font-5medium">{data?.birthDay}</span>
          </div>

          {/* <div
            onClick={handleNotificationToggle}
            className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px]"
          >
            <span className="text-[20px] font-7bold">알림설정</span>
            {isNotificationEnabled ? (
              <FaBell className="text-[20px]" />
            ) : (
              <FaBellSlash className="text-[24px]" />
            )}
          </div> */}
          <div
            onClick={() => {}}
            className="text-left text-[#aaa] text-[20px] font-7bold mt-[10px]"
          >
            로그아웃
          </div>
        </div>
      </div>

      <NavigationBar active="my" />
    </div>
  );
};

export default ProfilePage;
