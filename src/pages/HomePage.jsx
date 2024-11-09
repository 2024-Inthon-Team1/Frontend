import { FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { MdOutlineAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import albumImage from '../assets/album.jpeg';

const HomePage = () => {
  const userId = useSelector(state => state.user.userId);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleImageClick = index => {
    // /scrollalbum으로 이동하면서 선택한 이미지의 인덱스를 전달
    navigate('/albumscroll', { state: { selectedIndex: index } });
  };

  return (
    <div className="bg-[#eee] h-screen w-full pt-[50px]">
      <div className="flex justify-center pt-[50px] mx-5">
        <div className="w-12 h-12 bg-[#aaa] rounded-full"></div>
        <div className="flex flex-col ml-[20px]">
          <div className="text-left text-[20px] font-7bold">{userId}</div>
          <div className="text-left text-[#aaa] text-[16px] font-5medium mt-[-3px]">
            기본 정보 보기
          </div>
        </div>
        <FaAngleRight
          size={24}
          className="text-[#aaa] ml-auto mt-[10px] cursor-pointer"
          onClick={() => navigate('/profile')}
        />
      </div>
      <div className="flex px-5 py-[10px] bg-[#fff] rounded-[20px] mt-[20px] mx-5">
        <div className="text-[18px] font-7bold">#MENOW</div>
      </div>
      <div
        onClick={() => navigate('/search')}
        className="mt-[20px] bg-[#ddd] rounded-xl mx-[20px] font-7bold text-[20px] py-[10px]"
      >
        카세트테이프 선물하기 🎁
      </div>
      <div className="h-[20px] bg-[#ddd] mt-[20px]"></div>
      <div className="flex justify-between items-center mx-5">
        <span className="font-8extrabold text-[20px] my-[10px]">
          COLLECTION
        </span>
        <MdOutlineAdd className="text-[24px]" />
      </div>

      {/* 3x3 Image Grid */}
      <div className="grid grid-cols-3 gap-1 pb-[150px]">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="w-full aspect-square cursor-pointer">
            <img
              src={albumImage}
              alt="Album"
              className="w-full h-full object-cover"
              onClick={() => handleImageClick(index)} // 클릭 핸들러 추가
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
