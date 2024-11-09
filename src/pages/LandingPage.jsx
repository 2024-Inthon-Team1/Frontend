import React from 'react';
import GreenTape from '../assets/Tapes/GreenTape.png';
import BlueTape from '../assets/Tapes/BlueTape.png';
import RedTape from '../assets/Tapes/RedTape.png';
import IndigoTape from '../assets/Tapes/IndigoTape.png';
import PinkTape from '../assets/Tapes/PinkTape.png';
import MainTitle from '../assets/Title/MainTitle.svg';
import SubTitle from '../assets/Title/SubTitle.svg';

function LandingPage() {
  return (
    <div className="flex flex-col items-center space-y-4 h-[100vh] overflow-hidden relative">
      <div className="rotate-[-45deg] w-[250%] h-[200%]">
        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 500 }).map((_, index) => (
            <img
              src={GreenTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`green-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={RedTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`red-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={IndigoTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`indigo-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={PinkTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`pink-${index}`}
            />
          ))}
        </div>

        <div className="flex animate-scrollHorizontal whitespace-nowrap mb-4">
          {Array.from({ length: 300 }).map((_, index) => (
            <img
              src={BlueTape}
              alt="Icon"
              className="w-22 h-auto inline-block"
              key={`blue-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute" style={{ top: '30vh' }}>
        <img src={MainTitle} alt="Icon" className="w-22 h-auto inline-block" />
        <img src={SubTitle} alt="Icon" className="w-22 h-auto inline-block" />
      </div>
    </div>
  );
}

export default LandingPage;
