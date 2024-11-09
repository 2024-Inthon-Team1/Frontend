import { useState } from 'react';

const RegisterPage = () => {
    const [gender, setGender] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [nickname, setNickname] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    
    const handleContinue = () => {
        console.log({
            gender,
            birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
            nickname,
            bio,
            profileImage,
        });
    };

    // 생일 데이터 : 년, 월, 일
    const currentYear = new Date().getFullYear();
    const BIRTHDAY_YEAR_LIST = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => `${1920 + i}년`);
    const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
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
                <div className="font-9black text-4xl text-orange-500 text-left pt-8">3.81mm</div>
                <div className="font-6semibold text-2xl text-left py-1">회원가입</div>
    
                {currentStep >= 1 && (<>
                    <div className="text-left mt-2 pl-1">성별을 선택해주세요</div>
                    <div className="flex">
                        <button onClick={() => { setGender('남성'); setCurrentStep(2); }} className={`flex-grow h-12 rounded-xl py-2 m-1 bg-gray-300 ${gender === '남성' ? 'font-6semibold' : 'text-gray-400'}`}>
                            남성
                        </button>
                        <button onClick={() => { setGender('여성'); setCurrentStep(2); }} className={`flex-grow h-12 rounded-xl py-2 m-1 bg-gray-300 ${gender === '여성' ? 'font-6semibold' : 'text-gray-400'}`}>
                            여성
                        </button>
                    </div>
                </>)}
    
                {currentStep >= 2 && (<>
                    <div className="text-left mt-2 pl-1">생일이 언제인가요?</div>
                    <div className="flex space-x-2">
                        <select onChange={(e) => handleBirthDateChange('year', e.target.value)} value={birthYear} className="bg-gray-300 rounded-xl p-2 my-2">
                            <option value="">연도</option>
                            {BIRTHDAY_YEAR_LIST.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                        <select onChange={(e) => handleBirthDateChange('month', e.target.value)} value={birthMonth} className="bg-gray-300 rounded-xl p-2 my-2">
                            <option value="">월</option>
                            {BIRTHDAY_MONTH_LIST.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <select onChange={(e) => handleBirthDateChange('day', e.target.value)} value={birthDay} className="bg-gray-300 rounded-xl p-2 my-2">
                            <option value="">일</option>
                            {BIRTHDAY_DAY_LIST.map((day, index) => (
                                <option key={index} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </>)}
    
                {currentStep >= 3 && (<>
                    <div className="text-left mt-2 pl-1">닉네임을 정해주세요</div>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => { setNickname(e.target.value); setCurrentStep(5); }}
                        className="h-12 rounded-xl p-2 m-1 bg-gray-300 w-full"
                    />
                </>)}
    
                {currentStep >= 4 && (<>
                    <div className="text-left mt-2 pl-1">프로필 사진을 업로드해주세요(선택)</div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="cursor-pointer rounded-xl h-20 w-20 bg-gray-300 px-2 m-1 flex items-center justify-center">
                            사진
                        </label>
                        {profileImage && <span className="text-gray-500">{profileImage.name}</span>}
                    </div>
                </>)}
            </div>
    
            {currentStep >=4 && (<>
                <div className="relative mt-auto w-full">
                    <button onClick={handleContinue} className="w-full h-12 rounded-xl bg-orange-300">
                        계속
                    </button>
                </div>
            </>)}
        </div>
    );
};

export default RegisterPage;