import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { IoHeadset } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { signupUser } from '../api/auth';

const SelectSongPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gender, birthDate, nickname, profileImage } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [page, setPage] = useState(1);
  const trackContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (isNewSearch = true) => {
    const token = localStorage.getItem('spotifyAccessToken');

    try {
      const offset = (page - 1) * 10;
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=track&limit=10&offset=${offset}`, // 페이지 기반으로 오프셋 추가
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

  // 트랙 리스트 스크롤 이벤트 처리
  const handleScroll = () => {
    if (trackContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        trackContainerRef.current;

      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      handleSearch(false).finally(() => setLoading(false));
    }
  }, [page]);

  const selectTrack = track => {
    setSelectedTrack(track);
    setIsSelected(true);
  };

  const handleSignup = async () => {
    if (selectedTrack) {
      const userData = {
        sex: gender,
        birthday: birthDate,
        username: nickname,
        profileUrl: profileImage,
        signatureSongId: selectedTrack.id,
        signatureSong: selectedTrack.name,
        signatureSongArtist: selectedTrack.artists
          .map(artist => artist.name)
          .join(', '),
      };
      try {
        await signupUser(userData);
        alert('회원가입이 완료되었습니다!');
        navigate('/home');
      } catch (error) {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative pb-[100px]">
      <div className="flex-grow p-12">
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
                onClick={() => {
                  setPage(1);
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
                  <div className="flex-1 text-left bg-[#eee]">
                    <div className="text-[16px] font-7bold truncate">
                      {track.name}
                    </div>
                    <p className="text-[16px] font-5medium text-gray-600 truncate">
                      {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                  </div>
                  <FaRegCheckCircle
                    onClick={() => selectTrack(track)}
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
              <h3 className="w-[100%] flex items-center justify-center text-[30px] font-7bold">
                {selectedTrack.name}
              </h3>

              <p className="w-[100%] flex items-center justify-center text-[20px] font-7bold">
                {selectedTrack.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 회원가입 버튼을 하단에 고정 */}
      <div className="fixed bottom-0 w-full">
        <button
          onClick={handleSignup}
          className="w-full py-3 bg-[#ff8000] rounded-xl text-white text-[20px] font-7bold pt-4 pb-6 border-t z-60 rounded-tl-xl rounded-tr-xl"
          disabled={!isSelected}
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
  );
};

export default SelectSongPage;
