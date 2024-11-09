import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoPlayCircle } from 'react-icons/io5';
import { IoPlayForward } from 'react-icons/io5';
import { IoPlayBack } from 'react-icons/io5';
import NavigationBar from '../components/mainFooter/NavigationBar';

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
    <>
      <div className="h-20"></div>
      <div className="w-full h-14 flex items-center justify-between px-12">
        <div className="flex items-center">
          <div className="rounded-full h-9 w-9 bg-gray-300 mr-3"></div>
          <div className="font-semibold text-lg">{findings[0].id}의 #MENOW</div>
        </div>
        <MdOutlineKeyboardArrowRight className="h-8 w-8 text-gray-400" />
      </div>
      <div className="flex justify-center py-6">
        <div className="bg-gray-400 h-72 w-72 aspect-square rounded-lg shadow-md"></div>
      </div>
      <div className="text-start px-14">
        <div className="font-7bold text-2xl pt-2">
          {findings[0].signatureSong}
        </div>
        <div className="font-5medium text-lg pb-2">
          {findings[0].signatureSongArtist}
        </div>
        <div>재생 바 (나중에)</div>
      </div>
      <div className="flex justify-center pt-4">
        <IoPlayBack className="h-14 w-14 px-1.5" />
        <IoPlayCircle className="h-14 w-14" />
        <IoPlayForward className="h-14 w-14 px-1.5" />
      </div>
      이거 spotify api에 없음(함수로 하는거) 디자인 맘에 안들면 바꿔주라
      <NavigationBar active="find" />
    </>
  );
};

export default FindPage;
