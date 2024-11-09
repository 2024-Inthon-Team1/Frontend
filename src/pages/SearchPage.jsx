import { FaAngleLeft } from 'react-icons/fa6';
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
import { getAccessToken } from '../api/spotifyApi';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trackContainerRef = useRef(null);
  const location = useLocation();
  const { userId } = location.state || {};

  const handleSearch = async (isNewSearch = true) => {
    const token = getAccessToken();

    if (!token) {
      console.error(
        'Spotify access token is missing or expired. Redirecting to authenticate...'
      );
      return;
    }

    try {
      const offset = (page - 1) * 10;
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (isNewSearch) {
        setTracks(response.data.tracks.items);
      } else {
        setTracks(prevTracks => [...prevTracks, ...response.data.tracks.items]);
      }
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
    }
  };

  // Handle scroll to load more tracks
  const handleScroll = () => {
    if (trackContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        trackContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (page > 1) {
      handleSearch(false);
    }
  }, [page]);

  // 선택된 트랙인지 확인하는 함수 정의
  const isTrackSelected = trackId => {
    return selectedTracks.some(track => track.id === trackId);
  };

  const addTrackToList = track => {
    if (selectedTracks.length < 5) {
      setSelectedTracks([...selectedTracks, track]);
    } else {
      alert('한 카세트 테이프에는 최대 5곡까지 담을 수 있어요!');
    }
  };

  const handleGift = async () => {
    if (!userId || selectedTracks.length === 0) {
      alert('유효하지 않은 사용자 ID거나 선택된 트랙이 없습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/send-gift', {
        userId, // userId 포함
        tracks: selectedTracks.map(track => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map(artist => artist.name).join(', '),
        })),
      });

      if (response.status === 200) {
        setIsModalOpen(true); // 선물하기가 성공적으로 완료되면 모달을 오픈
      }
    } catch (error) {
      console.error('Error sending gift', error);
      alert('선물하기 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="min-h-screen w-full pb-[100px]">
      {/* 상단 네비게이션 */}
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[30px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-xl">
              테이프 선물하기
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
            onClick={() => {
              setPage(1); // 새로운 검색 시 페이지 번호를 초기화
              handleSearch(true);
            }}
            size={20}
            className="text-gray-500 mr-2"
          />
        </div>

        {/* 트랙 리스트 스크롤 가능한 영역 */}
        <div
          ref={trackContainerRef}
          onScroll={handleScroll}
          className="w-full max-w-md h-[300px] overflow-y-auto space-y-2 border-t border-b border-gray-300 mt-4"
        >
          {tracks.map(track => (
            <div
              key={track.id}
              className="flex items-center px-3 py-2 bg-[#eee] rounded-lg space-x-3 border border-gray-300"
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

      {/* 선물하기 버튼 하단 고정 */}
      <div className="fixed bottom-0 w-full">
        <button
          onClick={handleGift}
          className="w-full py-3 bg-[#ff8000] rounded-xl text-white text-[20px] font-7bold pt-4 pb-6 border-t z-60 rounded-tl-xl rounded-tr-xl"
        >
          선물하기 🎁
        </button>
      </div>

      <TapeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center font-7bold text-[20px] mb-4">
          선물 완료 🎉
        </div>
        <img
          src={TapeImage}
          alt="Tape"
          className="mx-auto w-[150px] h-auto animate-bounceScale my-4"
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
