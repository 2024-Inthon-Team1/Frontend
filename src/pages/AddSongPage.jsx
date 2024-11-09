import { FaAngleLeft } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';

const AddSongPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#eee] h-screen w-full">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[80px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer text-[#aaa]"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              ADD COLLECTION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSongPage;
