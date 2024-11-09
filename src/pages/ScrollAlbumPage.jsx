import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import albumImage from '../assets/album.jpeg';
import { FaAngleLeft } from 'react-icons/fa6';

const ScrollAlbumPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIndex } = location.state || {}; // 전달된 인덱스 가져오기

  // 이미지 참조 배열 생성
  const imageRefs = useRef([]);

  useEffect(() => {
    // 페이지 로드 시 해당 인덱스의 이미지로 스크롤 이동
    if (selectedIndex !== undefined && imageRefs.current[selectedIndex]) {
      imageRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedIndex]);

  return (
    <div className="bg-[#eee] h-screen w-full overflow-y-auto">
      {/* 상단 고정 부분 */}
      <div className="fixed top-0 left-0 w-full bg-[#eee] z-10 py-4">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[40px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer text-[#aaa]"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              COLLECTION
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 리스트 */}
      <div className="pt-[80px]">
        {' '}
        {/* 고정된 헤더의 높이만큼 패딩 추가 */}
        {Array.from({ length: 16 }).map((_, index) => (
          <img
            key={index}
            src={albumImage}
            alt="Album"
            className="w-full h-auto mt-[20px]"
            ref={el => (imageRefs.current[index] = el)} // 각 이미지 참조 설정
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollAlbumPage;
