import { FaAngleRight } from 'react-icons/fa6';
import { IoPlayCircle } from 'react-icons/io5';
import { IoPlayForward } from 'react-icons/io5';
import { IoPlayBack } from 'react-icons/io5';

const FindPage = () => {
  const findings = [
    {
      id: 'id ',
      username: '유저네임',
      signatureSongId: '시그니처송아이디',
      signatureSong: '시그니쳐송이름',
      signatureSongArtist: '시그니쳐송아티스트',
    },
  ];
  return (
    <div className="bg-[#eee] h-screen w-full">
      <div className="h-20"></div>
      <div className="w-full h-14 flex items-center justify-between px-11 mt-[20px]">
        <div className="flex items-center">
          <div className="rounded-full h-9 w-9 bg-gray-300 mr-3"></div>
          <div className="font-7bold text-[20px]">안지형님의 #MENOW</div>
        </div>
        <FaAngleRight size={24} className="text-[#aaa]" />
      </div>
      <div className="flex justify-center py-6">
        <div className="bg-gray-400 h-72 w-72 shadow-md"></div>
      </div>
      <div className="text-start px-14">
        <div className="font-8extrabold text-[24px]">From Me To You</div>
        <div className="font-6semib text-[16px]">Bruno Mars</div>
        <div>재생 바 (나중에)</div>
      </div>
      <div className="flex justify-between pt-4 px-[40px]">
        <IoPlayBack className="h-14 w-14 px-1.5 text-[#219B9D]" />
        <IoPlayCircle className="h-14 w-14 text-[#219B9D]" />
        <IoPlayForward className="h-14 w-14 px-1.5 text-[#219B9D]" />
      </div>
    </div>
  );
};

export default FindPage;
