import { FaAngleLeft, FaBell, FaBellSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/mainFooter/NavigationBar';
import BasicUser from '../assets/BasicUser.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [userData, setUserData] = useState({
    name: '홍길동', // 기본 이름
    gender: '남성', // 기본 성별
    birthDate: '2000-01-01T00:00:00Z', // 기본 생일
    profileImage: '', // 프로필 이미지가 없을 경우 기본 이미지 사용
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // API 엔드포인트를 '/api/user'로 가정
        const data = await response.json();

        setUserData({
          name: data.name,
          gender: data.gender,
          birthDate: formatBirthDate(data.birthDate), // 생일을 포맷팅하여 설정
          profileImage: data.profileImage,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(prevState => !prevState);
  };

  // 생일 포맷팅 함수
  const formatBirthDate = dateStr => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`; // YYYY/MM/DD 형식으로 변환
  };

  return (
    <div className="bg-[#eee] min-h-screen w-full relative">
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
          <div className="w-[120px] h-[120px] bg-[#aaa] rounded-full mt-[80px] mb-[40px]">
            <img
              src={userData.profileImage || BasicUser}
              alt="User Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">닉네임</span>
            <span className="text-[20px] font-5medium">{userData.name}</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">성별</span>
            <span className="text-[20px] font-5medium">{userData.gender}</span>
          </div>
          <div className="w-full flex justify-between items-center px-[20px] mb-[10px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">생일</span>
            <span className="text-[20px] font-5medium">
              {userData.birthDate}
            </span>
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
          <div className="w-full flex justify-between items-center px-[20px] mb-[20px] py-[10px] bg-white rounded-[10px] shadow-md">
            <span className="text-[20px] font-7bold">로그아웃</span>
            {/* <span className="text-[20px] font-5medium">로그아웃</span> */}
          </div>
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
