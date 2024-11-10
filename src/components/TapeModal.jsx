import { useNavigate } from 'react-router-dom';

const TapeModal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose(); // 모달 닫기 함수 호출
    navigate('/home'); // '/find' 페이지로 이동
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#eee] rounded-[20px] p-5 w-[250px]">
        {children}
        <button
          onClick={handleConfirm}
          className="mt-2 bg-[#aaa] w-[120px] text-white font-7bold p-2 px-4 rounded-md"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TapeModal;
