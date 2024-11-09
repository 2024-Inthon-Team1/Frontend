import { FaAngleRight } from 'react-icons/fa6';

const HomePage = () => {
  return (
    <div className="bg-[#eee] h-screen w-full px-5 pt-[50px]">
      <div className="flex justify-center pt-[50px]">
        <div className="w-12 h-12 bg-[#aaa] rounded-full"></div>
        <div className="flex flex-col ml-[20px]">
          <div className="text-left text-[20px] font-7bold">안지형</div>
          <div className="text-left text-[#aaa] text-[16px] font-5medium mt-[-3px]">
            기본 정보 보기
          </div>
        </div>
        <FaAngleRight size={24} className="text-[#aaa] ml-auto mt-[10px]" />
      </div>
      <div className="flex px-5 py-[10px] bg-[#fff] rounded-[20px] mt-[20px]">
        <div className="text-[18px] font-7bold">#MENOW</div>
      </div>
    </div>
  );
};

export default HomePage;
