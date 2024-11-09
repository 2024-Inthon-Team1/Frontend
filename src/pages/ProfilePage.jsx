import React from 'react';
import { ReactComponent as ProfileImgComponent } from 'src/assets/img/CreatorImg.svg';
import { ReactComponent as NicknameEditBtn } from 'src/assets/img/nicknameEditBtn.svg';
import { ReactComponent as Arrow } from 'src/assets/img/Arrow.svg';

const Profile = () => {
  return (
    <div className="w-full h-full bg-[#f2f3f6]">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center">
          <ProfileImgComponent className="w-[30%] h-[30%] rounded-full" />
          <div className="w-full flex justify-center items-center pt-4">
            <span className="text-xl font-bold">닉네임</span>
            <NicknameEditBtn className="w-4 h-4 ml-2" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center pt-8">
          <div
            onClick={() => {}}
            className="w-[90vw] h-16 px-[10%] flex justify-between items-center rounded-md bg-[#fcfcfc] mb-4"
          >
            <span className="text-base font-medium">알림설정</span>
            <Arrow className="w-auto" />
          </div>
          <div
            onClick={() => {}}
            className="w-[90vw] h-16 px-[10%] flex justify-between items-center rounded-t-md bg-[#fcfcfc]"
          >
            <span className="text-base font-medium">공지사항</span>
            <Arrow className="w-auto" />
          </div>
          <div
            onClick={() => {}}
            className="w-[90vw] h-16 px-[10%] flex justify-between items-center rounded-b-md bg-[#fcfcfc] mb-4"
          >
            <span className="text-base font-medium">문의/신고</span>
            <Arrow className="w-auto" />
          </div>
          <div
            onClick={() => {}}
            className="w-[90%] h-12 px-[10%] flex justify-start items-center rounded-md text-[#a0a0a0] text-sm font-light"
          >
            탈퇴하기
          </div>
        </div>
      </div>
      <IconFooter activepage="/profile" />
      <BackgroundFull color="#f2f3f6" />
    </div>
  );
};

export default Profile;
