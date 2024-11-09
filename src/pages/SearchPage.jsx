import { FaAngleLeft } from 'react-icons/fa6';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListBg from '../assets/ListBg.png';
import { IoAddCircleOutline } from 'react-icons/io5';

import PlayButton from '../components/PlayButton';
import PlayBar from '../components/PlayBar';

import TapeImage from '../assets/tape.png';
import SpotifyPlayButton from '../components/PlayButton';
import { FiSearch } from 'react-icons/fi';
import TapeModal from '../components/TapeModal';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const addTrackToList = track => {
    if (selectedTracks.length < 5) {
      setSelectedTracks([...selectedTracks, track]);
    } else {
      alert('한 카세트 테이프에는 최대 5곡까지 담을 수 있어요!');
    }
  };

  const isTrackSelected = trackId => {
    return selectedTracks.some(track => track.id === trackId);
  };

  return (
    <div className="bg-[#ff8000] min-h-screen w-full pb-[100px]">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[80px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              카세트테이프 선물하기
            </div>
          </div>
        </div>
      </div>

      {/* 카세트에 선택한 음악 리스트 */}
      <div className="flex flex-col items-center px-5">
        <div className="relative w-full max-w-md mb-4">
          <img
            src={ListBg}
            alt="List Background"
            className="w-full h-auto rounded-md shadow-sm"
          />

          <div className="absolute inset-0 bg-white/0 p-2 rounded-md text-left text-[16px] space-y-1 pl-10 pt-[65px]">
            {selectedTracks.length > 0 ? (
              selectedTracks.map((track, index) => (
                <p key={track.id} className="font-0logo truncate">
                  {index + 1}. {track.name} -{' '}
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <p className="text-center text-[20px] font-7bold">
          검색하여 음악을 추가하세요
        </p>
        <p className="text-center text-[18px] font-5medium">
          한 카세트 테이프에는 최대 <strong>5곡</strong>까지 담을 수 있어요!
        </p>

        {/* 검색 및 트랙 추가 */}
        <div className="flex items-center w-full max-w-md my-4 px-2 bg-white border border-gray-300 rounded-lg">
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
              <IoAddCircleOutline
                onClick={() => addTrackToList(track)}
                disabled={isTrackSelected(track.id)}
                className={`text-xl ${
                  isTrackSelected(track.id)
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <SpotifyPlayButton trackId="3Nrfpe0tUJi4K4DXYWgMUX" /> */}

      {/* 선물하기 버튼 하단 고정 */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 mb-5 px-[20px]">
        <button
          onClick={() => setIsModalOpen(true)} // 모달 열기
          className="w-full py-3 bg-[#219B9D] rounded-xl text-white text-[20px] font-7bold"
        >
          선물하기 🎁
        </button>
      </div>


      {/* <PlayButton track_id="7pKfPomDEeI4TPT6EOYjn9" />
      <PlayBar track_id="7pKfPomDEeI4TPT6EOYjn9" /> */}


      <TapeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center font-7bold text-[20px] mb-4">
          선물 완료 🎉
        </div>
        <img
          src={TapeImage}
          alt="Tape"
          className="mx-auto w-[150px] h-auto animate-bounceScale my-4" // 애니메이션 클래스 추가
        />
      </TapeModal>

      {/* 애니메이션 스타일 정의 */}
      <style>
        {`
          @keyframes bounceScale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
          .animate-bounceScale {
            animation: bounceScale 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SearchPage;
