//active props로 find/my/chat 중 하나를 받아서 해당 아이콘을 오렌지색으로 표시

import React from 'react';
import FindOrange from './findOrange.svg';
import FindGrey from './findGray.svg';
import ChatOrange from './chatOrange.svg';
import ChatGrey from './chatGray.svg';
import HomeOrange from './homeOrange.svg';
import HomeGrey from './homeGray.svg';

function MainFooter({ active }) {
  return (
    <div
      className="absolute bottom-0 w-full flex justify-around items-center bg-gray-100 pt-2 pb-6 border-t border-gray-300"
      style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.05)' }} //그림자 효과
    >
      <div className="flex flex-col items-center">
        <div>
          <img
            src={active === 'find' ? FindOrange : FindGrey}
            alt="Find Icon"
            className="h-10 w-10"
          />
        </div>
        <span
          className={`text-md font-bold ${active === 'find' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          FIND
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div>
          <img
            src={active === 'my' ? HomeOrange : HomeGrey}
            alt="My Icon"
            className="h-10 w-10"
          />
        </div>
        <span
          className={`text-md font-bold ${active === 'my' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          MY
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div>
          <img
            src={active === 'chat' ? ChatOrange : ChatGrey}
            alt="Chat Icon"
            className="h-10 w-10"
          />
        </div>
        <span
          className={`text-md font-bold ${active === 'chat' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          CHAT
        </span>
      </div>
    </div>
  );
}

export default MainFooter;
