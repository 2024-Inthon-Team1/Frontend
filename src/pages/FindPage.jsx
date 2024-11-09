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
      signatureSong: 'WE LIKE 2 PARTY',
      signatureSongArtist: 'BIGBANG',
    },
    {
      id: '2',
      username: '이철수',
      signatureSongId: '45645645',
      signatureSong: 'FANTASTIC BABY',
      signatureSongArtist: 'BIGBANG',
    },
    {
      id: '3',
      username: '박영희',
      signatureSongId: '78978978',
      signatureSong: 'LOSER',
      signatureSongArtist: 'BIGBANG',
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
          <div className="rounded-full h-9 w-9 bg-gray-300 mr-3"></div>
          <div className="font-semibold text-xl">
            {findings[currentIndex].username}의 #MENOW
          </div>
        </div>
        <MdOutlineKeyboardArrowRight
          className="h-8 w-8 text-gray-400"
          onClick={() => navigate(`/otherhome/${findings[currentIndex].id}`)}
        />
      </div>

      {/* 이미지 및 노래 정보 섹션 */}
      <div
        className={`flex flex-col items-center justify-center flex-1 pt-1 ${swipeDirection}`}
      >
        <div className="bg-gray-400 h-72 w-72 aspect-square rounded-lg shadow-md mb-4"></div>
        <div className="text-center">
          <div className="font-bold text-2xl">
            {findings[currentIndex].signatureSong}
          </div>
          <div className="font-medium text-lg text-gray-600">
            {findings[currentIndex].signatureSongArtist}
          </div>
          <div>재생 바 (나중에)</div>
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
