import axios from 'axios';
import { FaAngleLeft } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { FaRegCheckCircle } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddSongPage = () => {
  const navigate = useNavigate();
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

  return (
    <div className="bg-[#eee] min-h-screen w-full pb-[50px]">
      <div className="py-8">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <div className="w-full flex justify-start pt-[80px]">
            <FaAngleLeft
              size={24}
              className="cursor-pointer text-[#aaa]"
              onClick={() => navigate('/home')}
            />
            <div className="absolute font-8extrabold text-[22px] left-1/2 transform -translate-x-1/2 font-bold text-lg">
              ADD COLLECTION
            </div>
          </div>
        </div>
      </div>
      {!isSelected && (
        <>
          <div className="flex w-full justify-center mt-[40px]">
            <div className="flex items-center w-full max-w-full px-3 mx-5 bg-white border border-gray-300 rounded-lg">
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
                className="text-gray-500 mr-2 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex w-full justify-center flex-col px-5 mt-[5px]">
            {tracks.map(track => (
              <div
                key={track.id}
                className="flex items-center px-3 py-2 my-[5px] bg-[#FEF3E2] rounded-lg space-x-3 border border-gray-300"
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
        <div className="flex flex-col items-center mt-[70px] px-[20px]">
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
          <input
            type="text"
            placeholder="한줄 감상"
            className="w-full max-w-md mt-[20px] px-5 py-2 mx-[20px] bg-[#d9d9d9] text-[20px] font-7bold rounded-lg focus:outline-none"
          />
          <button className="w-[calc(100%-40px)] absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-[#FF8000] text-white py-2 px-6 rounded-lg text-[18px] font-7bold hover:bg-[#FF8E8E] focus:outline-none">
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSongPage;
