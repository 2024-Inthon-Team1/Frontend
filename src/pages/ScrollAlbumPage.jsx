import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import Cover1 from '../assets/Albums/cover1.jpg';
import Cover2 from '../assets/Albums/cover2.jpg';
import Cover3 from '../assets/Albums/cover3.jpg';
import Cover4 from '../assets/Albums/cover4.jpg';
import Cover5 from '../assets/Albums/cover5.jpg';

const ScrollAlbumPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedIndex } = location.state || {}; // 전달된 인덱스 가져오기

  const [items] = useState([
    {
      id: 1,
      imageUrl: Cover1,
      title: '어떻게 이별까지 사랑하겠어 널 사랑하는거지',
      artist: 'AKMU (악뮤)',
      view: '슬픈 날 듣는 노래',
    },
    {
      id: 2,
      imageUrl: Cover2,
      title: 'HAPPY',
      artist: 'DAY6',
      view: '기쁜 날 듣는 노래',
    },
    {
      id: 3,
      imageUrl: Cover3,
      title: 'POWER',
      artist: 'G-DRAGON',
      view: '빠워!',
    },
    {
      id: 4,
      imageUrl: Cover4,
      title: 'APT.',
      artist: '로제(ROSE), Bruno Mars',
      view: '아파트 아파트',
    },
    {
      id: 5,
      imageUrl: Cover5,
      title: '첫 눈',
      artist: 'EXO',
      view: '메리크리스마스',
    },
  ]);

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
        {items.map((item, index) => (
          <>
            <img
              key={item.id}
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto mt-[20px]"
              ref={el => (imageRefs.current[index] = el)} // 각 이미지 참조 설정
            />
            <div className="text-left font-7bold text-[20px] px-[20px] mt-[10px]">
              {item.title}
            </div>
            <div className="text-left font-6semibold mt-[-5px] text-[16px] px-[20px]">
              {item.artist}
            </div>
            <div className="text-left font-6semibold text-[#aaa] mt-[-5px] text-[16px] px-[20px]">
              {item.view}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ScrollAlbumPage;
