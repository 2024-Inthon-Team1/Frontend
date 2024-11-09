import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoHeadset } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { FaRegCheckCircle } from 'react-icons/fa';

import { signupUser } from '../api/auth';

const SelectSongPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gender, birthDate, nickname } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleSearch = async () => {
    const token = localStorage.getItem('spotifyAccessToken');

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`, // limit=10 추가
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
    }
  };

  const selectTrack = track => {
    setSelectedTrack(track); // 선택된 트랙 저장
    setIsSelected(true); // 선택 완료 상태로 설정
  };

  const handleSignup = async () => {
    if (selectedTrack) {
      const userData = {
        sex: gender === '남성' ? 'MALE' : 'FEMALE',
        birthday: birthDate,
        username: nickname,
        signatureSongId: selectedTrack.id,
        signatureSong: selectedTrack.name,
        signatureSongArtist: selectedTrack.artists
          .map(artist => artist.name)
          .join(', '),
      };
      try {
        await signupUser(userData);
        navigate('/home');
        alert('회원가입이 완료되었습니다!');
        navigate;
      } catch (error) {
        alert('회원가입 중 오류가 발생했습니다.');
      }
      console.log(userData);
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen p-7 flex flex-col relative pb-[100px]">
      <div className="flex-grow">
        <div className="font-0logo text-[48px] text-orange-500 text-left pt-8">
          3.81mm
        </div>
        <div className="font-8extrabold text-2xl text-left pb-2">
          대표곡을 골라주세요
        </div>

        {!isSelected && (
          <>
            <div className="flex justify-center mt-[100px]">
              <IoHeadset
                className="text-[120px]"
                style={{
                  animation: 'bounceScaleColor 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* 검색 및 트랙 추가 */}
            <div className="flex items-center w-full max-w-md mt-[40px] my-4 px-2 bg-white border border-gray-300 rounded-lg">
              <input
                type="text"
                className="flex-1 p-2 focus:outline-none placeholder-gray-500 font-6semibold"
                placeholder="음악을 검색하세요"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <FiSearch
                onClick={() => handleSearch()}
                size={20}
                className="text-gray-500 mr-2"
              />
            </div>

            <div className="w-full max-w-md space-y-2">
              {tracks.map(track => (
                <div
                  key={track.id}
                  className="flex items-center px-3 py-2 bg-[#FEF3E2] rounded-lg space-x-3 border border-gray-300"
                >
                  <img
                    src={track.album.images[2]?.url}
                    alt={track.name}
                    className="w-10 h-10 rounded bg-gray-300"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="text-[16px] font-7bold truncate">
                      {track.name}
                    </h3>
                    <p className="text-[16px] font-5medium text-gray-600 truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                  </div>
                  <FaRegCheckCircle
                    onClick={() => selectTrack(track)} // 선택된 트랙 설정
                    className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {isSelected && (
          <div className="flex flex-col items-center mt-[100px]">
            <img
              src={selectedTrack.album.images[0]?.url}
              alt={selectedTrack.name}
              className="w-64 h-64"
            />
            <div className="flex flex-col w-full px-[40px] mt-[20px]">
              <h3 className="text-[20px] text-left font-7bold">
                {selectedTrack.name}
              </h3>
              <p className="text-[18px] text-left font-5medium text-gray-600">
                {selectedTrack.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* 검색 및 트랙 추가
        <div className="flex items-center w-full max-w-md mt-[40px] my-4 px-2 bg-white border border-gray-300 rounded-lg">
          <input
            type="text"
            className="flex-1 p-2 focus:outline-none placeholder-gray-500 font-6semibold"
            placeholder="음악을 검색하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FiSearch
            onClick={() => handleSearch()}
            size={20}
            className="text-gray-500 mr-2"
          />
        </div>

        <div className="w-full max-w-md space-y-2">
          {tracks.map(track => (
            <div
              key={track.id}
              className="flex items-center px-3 py-2 bg-[#FEF3E2] rounded-lg space-x-3 border border-gray-300"
            >
              <img
                src={track.album.images[2]?.url}
                alt={track.name}
                className="w-10 h-10 rounded bg-gray-300"
              />
              <div className="flex-1 text-left">
                <h3 className="text-[16px] font-7bold truncate">
                  {track.name}
                </h3>
                <p className="text-[16px] font-5medium text-gray-600 truncate">
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
              <FaRegCheckCircle
                onClick={() => selectTrack(track)} // 선택된 트랙 설정
                className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div> */}

        {/* 회원가입 버튼을 하단에 고정 */}
        <div className="w-full fixed bottom-0 left-0 right-0 px-7 pb-5">
          <button
            onClick={handleSignup}
            className="w-full h-12 rounded-xl bg-[#219B9D] font-7bold text-[#fff] text-[20px]"
          >
            회원가입
          </button>
        </div>

        {/* 인라인 스타일로 애니메이션 정의 */}
        <style>
          {`
          @keyframes bounceScaleColor {
            0%, 100% {
              transform: scale(1);
              color: #374151; /* Dark Gray */
            }
            50% {
              transform: scale(1.2);
              color: #9CA3AF; /* Light Gray */
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default SelectSongPage;
