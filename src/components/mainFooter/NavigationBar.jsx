import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RiPhoneFindFill } from 'react-icons/ri';
import { IoChatbubble } from 'react-icons/io5';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState('/home');

  const handleNavigate = path => {
    setActiveIcon(path);
    navigate(path);
  };

  return (
    <>
      <main className="pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-[#eee] flex justify-around items-center border-t border-t-[#aaa]">
        <button
          className={`flex flex-col items-center transition-all duration-300 ${
            activeIcon === '/find' ? 'text-[#ff8000]' : 'text-[#aaa]'
          } hover:text-[#ff8000]`}
          onClick={() => handleNavigate('/find')}
        >
          <RiPhoneFindFill size={30} />
          <span className="font-5medium text-[14px]">FIND</span>
        </button>
        <button
          className={`flex flex-col items-center transition-all duration-300 ${
            activeIcon === '/home' ? 'text-[#ff8000]' : 'text-[#aaa]'
          } hover:text-[#ff8000]`}
          onClick={() => handleNavigate('/home')}
        >
          <AiFillHome size={30} />
          <span className="font-5medium text-[14px]">MY</span>
        </button>
        <button
          className={`flex flex-col items-center transition-all duration-300 ${
            activeIcon === '/chatlist' ? 'text-[#ff8000]' : 'text-[#aaa]'
          } hover:text-[#ff8000]`}
          onClick={() => handleNavigate('/chatlist')}
        >
          <IoChatbubble size={30} />
          <span className="font-5medium text-[14px]">CHAT</span>
        </button>
      </nav>
    </>
  );
};

export default NavigationBar;

// import React from 'react';
// import FindOrange from './findOrange.svg';
// import FindGrey from './findGray.svg';
// import ChatOrange from './chatOrange.svg';
// import ChatGrey from './chatGray.svg';
// import HomeOrange from './homeOrange.svg';
// import HomeGrey from './homeGray.svg';

// function NavigationBar({) {
//   return (
//     <div
//       className="absolute bottom-0 w-full flex justify-around items-center bg-gray-100 pt-2 pb-6 border-t border-gray-300"
//       style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.05)' }} //그림자 효과
//     >
//       <div className="flex flex-col items-center">
//         <div>
//           <img
//             src={active === 'find' ? FindOrange : FindGrey}
//             alt="Find Icon"
//             className="h-10 w-10"
//           />
//         </div>
//         <span
//           className={`text-md font-bold ${active === 'find' ? 'text-orange-500' : 'text-gray-500'}`}
//         >
//           FIND
//         </span>
//       </div>

//       <div className="flex flex-col items-center">
//         <div>
//           <img
//             src={active === 'my' ? HomeOrange : HomeGrey}
//             alt="My Icon"
//             className="h-10 w-10"
//           />
//         </div>
//         <span
//           className={`text-md font-bold ${active === 'my' ? 'text-orange-500' : 'text-gray-500'}`}
//         >
//           MY
//         </span>
//       </div>

//       <div className="flex flex-col items-center">
//         <div>
//           <img
//             src={active === 'chat' ? ChatOrange : ChatGrey}
//             alt="Chat Icon"
//             className="h-10 w-10"
//           />
//         </div>
//         <span
//           className={`text-md font-bold ${active === 'chat' ? 'text-orange-500' : 'text-gray-500'}`}
//         >
//           CHAT
//         </span>
//       </div>
//     </div>
//   );
// }

// export default NavigationBar;
