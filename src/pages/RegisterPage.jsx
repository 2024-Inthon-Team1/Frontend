import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';

const RegisterPage = () => {
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleContinue = () => {
    const userData = {
      gender,
      birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
      nickname,
      profileImage,
    };

    navigate('/selectsong', { state: userData });
  };

  // 생일 데이터 : 년, 월, 일
  const currentYear = new Date().getFullYear();
  const BIRTHDAY_YEAR_LIST = Array.from(
    { length: currentYear - 1920 + 1 },
    (_, i) => `${1920 + i}년`
  );
  const BIRTHDAY_MONTH_LIST = Array.from(
    { length: 12 },
    (_, i) => `${i + 1}월`
  );
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const handleFileChange = e => {
    setProfileImage(e.target.files[0]);
    setCurrentStep(4);
  };

  const handleBirthDateChange = (field, value) => {
    const updatedYear = field === 'year' ? value : birthYear;
    const updatedMonth = field === 'month' ? value : birthMonth;
    const updatedDay = field === 'day' ? value : birthDay;

    if (field === 'year') setBirthYear(value);
    if (field === 'month') setBirthMonth(value);
    if (field === 'day') setBirthDay(value);

    if (updatedYear && updatedMonth && updatedDay) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen p-7 flex flex-col relative">
      <div className="flex-grow">
        <div className="font-9black text-[48px] text-orange-500 text-left pt-8">
          3.81mm
        </div>
        <div className="font-8extrabold text-2xl text-left pb-2">회원가입</div>

        {currentStep >= 1 && (
          <>
            <div className="text-left text-[20px] font-6semibold mt-8">
              성별을 선택해주세요
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setGender('남성');
                  setCurrentStep(2);
                }}
                className={`flex-grow h-12 font-8extrabold text-[20px] rounded-xl py-2 mt-2 mr-1 bg-gray-300 ${gender === '남성' ? 'font-6semibold' : 'text-gray-400'}`}
              >
                남성
              </button>
              <button
                onClick={() => {
                  setGender('여성');
                  setCurrentStep(2);
                }}
                className={`flex-grow h-12 font-8extrabold text-[20px] rounded-xl py-2 mt-2 ml-1 bg-gray-300 ${gender === '여성' ? 'font-6semibold' : 'text-gray-400'}`}
              >
                여성
              </button>
            </div>
          </>
        )}

        {currentStep >= 2 && (
          <>
            <div className="text-left text-[20px] font-6semibold mt-[20px]">
              생일이 언제인가요?
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <select
                  onChange={e => handleBirthDateChange('year', e.target.value)}
                  value={birthYear}
                  className="bg-gray-300 rounded-xl py-2 px-3 pr-8 my-2 w-full font-6semibold text-[18px] appearance-none" // 기본 아이콘 제거
                >
                  <option value="">연도</option>
                  {BIRTHDAY_YEAR_LIST.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown />
                </span>
              </div>

              <div className="relative flex-grow">
                <select
                  onChange={e => handleBirthDateChange('month', e.target.value)}
                  value={birthMonth}
                  className="bg-gray-300 rounded-xl py-2 px-3 my-2 w-full text-[18px] font-6semibold appearance-none"
                >
                  <option value="">월</option>
                  {BIRTHDAY_MONTH_LIST.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown />
                </span>
              </div>

              <div className="relative flex-grow">
                <select
                  onChange={e => handleBirthDateChange('day', e.target.value)}
                  value={birthDay}
                  className="bg-gray-300 rounded-xl py-2 px-3 my-2 w-full text-[18px] font-6semibold appearance-none"
                >
                  <option value="">일</option>
                  {BIRTHDAY_DAY_LIST.map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
          </>
        )}

        {currentStep >= 3 && (
          <>
            <div className="text-left text-[20px] font-6semibold mt-[20px]">
              닉네임을 정해주세요
            </div>
            <input
              type="text"
              value={nickname}
              onChange={e => {
                setNickname(e.target.value);
                setCurrentStep(5);
              }}
              className="h-12 rounded-xl mt-2 p-3 bg-gray-300 w-full outline-none text-[18px] font-6semibold"
            />
          </>
        )}

        {currentStep >= 4 && (
          <>
            <div className="text-left text-[20px] font-6semibold mt-[20px]">
              프로필 사진을 업로드해주세요(선택)
            </div>
            <div className="flex items-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-xl w-full py-2 bg-gray-300 mt-[10px] flex items-center justify-center"
              >
                {profileImage ? (
                  <span className="text-gray-500 text-[18px] font-6semibold">
                    {profileImage.name}
                  </span>
                ) : (
                  <span className="text-gray-500 text-[18px] font-6semibold">
                    사진 선택하기
                  </span>
                )}
              </label>
            </div>
          </>
        )}
      </div>

      {currentStep >= 4 && (
        <>
          <div className="w-full mt-5" style={{ marginTop: '20px' }}>
            <button
              onClick={handleContinue}
              className="w-full h-12 rounded-xl bg-[#219B9D] font-7bold text-[#fff] text-[20px]"
            >
              계속
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
