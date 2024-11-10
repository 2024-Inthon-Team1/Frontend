import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import {
  IoPlaySkipForward,
  IoPlaySkipBackSharp,
  IoPauseCircle,
} from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';
import './FindPage.css';
import NavigationBar from '../components/mainFooter/NavigationBar';
import { useNavigate } from 'react-router-dom';
import Cover1 from '../assets/Albums/cover1.jpg';
import Cover2 from '../assets/Albums/cover2.jpg';
import Cover3 from '../assets/Albums/cover3.jpg';
import Cover4 from '../assets/Albums/cover4.jpg';
import Cover5 from '../assets/Albums/cover5.jpg';
import BasicUser from '../assets/BasicUser.svg';
import { FaAngleRight } from 'react-icons/fa';

const FindPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [isPause, setIsPause] = useState(true);
  const navigate = useNavigate();

  const findings = [
    {
      id: '1',
      username: '고수영',
      signatureSongId: '12312321',
      signatureSong: '첫 눈',
      signatureSongArtist: 'EXO',
      imageUrl: Cover1,
    },
    {
      id: '2',
      username: '이철수',
      signatureSongId: '45645645',
      signatureSong: 'APT',
      signatureSongArtist: '로제 (ROSÉ)',
      imageUrl: Cover2,
    },
    {
      id: '3',
      username: '박영희',
      signatureSongId: '78978978',
      signatureSong: 'POWER',
      signatureSongArtist: 'G-DRAGON',
      imageUrl: Cover3,
    },
  ];

  const handleSwipe = direction => {
    if (swipeDirection) return; // 애니메이션 중복 방지

    if (direction === 'RIGHT') {
      setSwipeDirection('slide-in-right');
      setCurrentIndex(prevIndex =>
        prevIndex === 0 ? findings.length - 1 : prevIndex - 1
      );
    } else if (direction === 'LEFT') {
      setSwipeDirection('slide-in-left');
      setCurrentIndex(prevIndex =>
        prevIndex === findings.length - 1 ? 0 : prevIndex + 1
      );
    }

    // 애니메이션이 끝난 후 상태 초기화
    setTimeout(() => setSwipeDirection(''), 300); // 300ms는 애니메이션 지속 시간과 동일
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
  });

  return (
    <div {...handlers} className="find-page-container h-screen w-screen">
      {/* 상단 프로필 및 제목 */}
      <div className="w-full h-14 flex items-center justify-between px-6 mt-14 mb-6">
        <div className="flex items-center">
          <img
            src={BasicUser}
            alt="User Profile"
            className="rounded-full h-9 w-9 mr-3"
          />
          <div className="font-semibold text-xl">
            {findings[currentIndex].username}의 #MENOW
          </div>
        </div>
        {/* <MdOutlineKeyboardArrowRight
          className="h-8 w-8 text-gray-400"
          onClick={() => navigate(`/otherhome/${findings[currentIndex].id}`)}
        /> */}
        <FaAngleRight
          size={24}
          className="text-[#aaa] cursor-pointer"
          onClick={() => navigate(`/scanhome`, { state: { id: findings.id } })}
        ></FaAngleRight>
      </div>

      {/* 이미지 및 노래 정보 섹션 */}
      <div
        className={`flex flex-col items-center justify-center flex-1 pt-10 ${swipeDirection}`}
      >
        <div className="h-72 w-72 aspect-square rounded-lg shadow-md mb-4">
          <img src={findings[currentIndex].imageUrl} alt="Profile" />
        </div>
        <div className="text-center">
          <div className="font-bold text-2xl">
            {findings[currentIndex].signatureSong}
          </div>
          <div className="font-medium text-lg text-gray-600">
            {findings[currentIndex].signatureSongArtist}
          </div>
        </div>
      </div>

      {/* 재생 컨트롤 버튼 */}
      <div className="flex justify-center py-6">
        <IoPlaySkipBackSharp
          className="h-16 w-16 mx-4 cursor-pointer"
          onClick={() => handleSwipe('RIGHT')}
        />
        <IoPauseCircle className="h-16 w-16 mx-4 cursor-pointer" />
        <IoPlaySkipForward
          className="h-16 w-16 mx-4 cursor-pointer"
          onClick={() => handleSwipe('LEFT')}
        />
      </div>

      {/* NavigationBar를 화면 하단에 고정 */}
      <NavigationBar active="find" className="navigation-bar" />
    </div>
  );
};

export default FindPage;
