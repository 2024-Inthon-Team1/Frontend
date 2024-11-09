import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoPlaySkipForward, IoPlaySkipBackSharp, IoPauseCircle } from "react-icons/io5";
import { useSwipeable } from 'react-swipeable';
import './FindPage.css';
import NavigationBar from '../components/mainFooter/NavigationBar';
import getFindings from '../api/getfindings';

const FindPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    const fetchFindings = async () => {
      try {
        const data = await getFindings();
        setFindings(data);
        console.log('fechiingeh 완료');
      } catch (error) {
        console.error("Failed to fetch findings:", error);
      }
    };
    fetchFindings();
  }, []);

  const handleSwipe = (direction) => {
    if (swipeDirection) return;

    if (direction === 'RIGHT') {
      setSwipeDirection('slide-in-right');
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? findings.length - 1 : prevIndex - 1));
    } else if (direction === 'LEFT') {
      setSwipeDirection('slide-in-left');
      setCurrentIndex((prevIndex) => (prevIndex === findings.length - 1 ? 0 : prevIndex + 1));
    }

    setTimeout(() => setSwipeDirection(''), 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
  });

  if (findings.length === 0) return <div>Loading...</div>;

  return (
  <>
    <div {...handlers} className="find-page-container h-[calc(100vh-160px)] w-full bg-white">
      <div className="w-full h-14 flex items-center justify-between px-6 mt-14">
        <div className="flex items-center">
          <div className="rounded-full h-9 w-9 bg-gray-300 mr-3"></div>
          <div className="font-semibold text-lg">{findings[currentIndex].id}의 #MENOW</div>
        </div>
        <MdOutlineKeyboardArrowRight className="h-8 w-8 text-gray-400" />
      </div>

      <div className={`flex flex-col items-center justify-center flex-1 pt-1 ${swipeDirection}`}>
        <div className="bg-gray-400 h-72 w-72 aspect-square rounded-lg shadow-md mb-4"></div>
        <div className="text-center">
          <div className="font-bold text-2xl">{findings[currentIndex].signatureSong}</div>
          <div className="font-medium text-lg text-gray-600">{findings[currentIndex].signatureSongArtist}</div>
          <div>재생 바 (나중에)</div>
        </div>
      </div>

      <div className="flex justify-center py-6">
        <IoPlaySkipBackSharp className="h-16 w-16 mx-4" />
        <IoPauseCircle className="h-16 w-16 mx-4" />
        <IoPlaySkipForward className="h-16 w-16 mx-4" />
      </div>
    </div>
    <NavigationBar />
  </>
);
};

export default FindPage;