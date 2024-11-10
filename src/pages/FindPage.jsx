import { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { IoPlayCircle } from 'react-icons/io5';
import { IoPlayForward } from 'react-icons/io5';
import { IoPlayBack } from 'react-icons/io5';
import NavigationBar from '../components/mainFooter/NavigationBar';
import { getRandom } from '../api/user';

const FindPage = () => {
  const [finding, setFinding] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFinding, setCurrentFinding] = useState(null);

  const fetchFindings = async () => {
    try {
      const data = await getRandom();
      setFinding(data);
      setCurrentFinding(data.data[currentIndex]);
      console.log('data', data);
    } catch (error) {
      console.error('Error fetching findings:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchFindings();
  }, []);

  // 이전 항목으로 이동하는 함수
  const handlePrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : finding.length - 1
    );
  };

  // 다음 항목으로 이동하는 함수
  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex < finding.length - 1 ? prevIndex + 1 : 0
    );
  };

  // 현재 인덱스에 해당하는 항목

  return (
    <div className="bg-[#eee] h-screen w-full">
      <>
        <div className="h-20"></div>
        <div key={currentFinding?.id} className="mb-8">
          <div className="w-full h-14 flex items-center justify-between px-11 mt-[20px]">
            <div className="flex items-center">
              <div className="rounded-full h-9 w-9 bg-gray-300 mr-3"></div>
              <div className="font-7bold text-[20px]">
                {currentFinding?.username}님의 #MENOW
              </div>
            </div>
            <FaAngleRight size={24} className="text-[#aaa]" />
          </div>
          <div className="flex justify-center py-6">
            <div className="bg-gray-400 h-72 w-72 shadow-md"></div>
          </div>
          <div className="text-start px-14">
            <div className="font-8extrabold text-[24px]">
              {currentFinding?.signatureSong}
            </div>
            <div className="font-6semib text-[16px]">
              {currentFinding?.signatureSongArtist}
            </div>
            <div>재생 바 (나중에)</div>
          </div>
          <div className="flex justify-between pt-4 px-[40px]">
            <IoPlayBack
              onClick={handlePrevious}
              className="h-14 w-14 px-1.5 text-[#219B9D] cursor-pointer"
            />
            <IoPlayCircle className="h-14 w-14 text-[#219B9D]" />
            <IoPlayForward
              onClick={handleNext}
              className="h-14 w-14 px-1.5 text-[#219B9D] cursor-pointer"
            />
          </div>
        </div>
      </>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <NavigationBar active="find" />
      </div>
    </div>
  );
};

export default FindPage;
