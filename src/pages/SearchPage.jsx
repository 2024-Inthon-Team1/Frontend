import React, { useState } from 'react';
import axios from 'axios';
import MainBg from '../assets/MainBg.png';
import ListBg from '../assets/ListBg.png';
import SpotifyPlayButton from '../components/PlayButton';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleSearch = async () => {
    const token =
      'BQCiEMKC5UV_bx4Ks4dfEoEDrd1zfN01-PQa2ZvEovLjIGCdm5ANGd5Qp41uYKpAWLOB91PSvDj9_Zh8_Q-SId9OlHMJnF-eLJ9osQjZA-1H934uEDw';

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`,
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
    <div className="flex flex-col items-center ">
      <div
        className="w-full max-w-md bg-cover heig max-h-md bg-center border border-gray-300 rounded-md shadow-sm"
        style={{
          backgroundImage: `url(${ListBg})`,
          height: '30vh',
        }}
      >
        <div className="text-left text-sm space-y-1 pl-1">
          {selectedTracks.length > 0 ? (
            selectedTracks.map((track, index) => (
              <p key={track.id} className="truncate">
                {index + 1}. {track.name} -{' '}
                {track.artists.map(artist => artist.name).join(', ')}
              </p>
            ))
          ) : (
            <p className="text-gray-400">카세트에 음악을 추가하세요</p>
          )}
        </div>
      </div>

      <p className="text-center text-gray-700 mb-2 font-semibold">
        검색하여 음악을 추가하세요
      </p>
      <p className="text-center text-gray-500 mb-4 text-xs">
        한 카세트 테이프에는 최대 <strong>5곡</strong>까지 담을 수 있어요!
      </p>

      <div className="flex items-center w-full max-w-md mb-4 px-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="음악을 검색하세요"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-gray-300 rounded-r-lg focus:outline-none"
        >
          🔍
        </button>
      </div>

      <div className="w-full max-w-md space-y-2">
        {tracks.map(track => (
          <div
            key={track.id}
            className="flex items-center px-3 py-2 bg-gray-200 rounded-lg space-x-3 border border-gray-300"
          >
            <img
              src={track.album.images[2]?.url}
              alt={track.name}
              className="w-10 h-10 rounded bg-gray-300"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium truncate">{track.name}</h3>
              <p className="text-xs text-gray-600 truncate">
                {track.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
            <button
              onClick={() => addTrackToList(track)}
              disabled={isTrackSelected(track.id)}
              className={`text-xl ${
                isTrackSelected(track.id)
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <SpotifyPlayButton trackId="3Nrfpe0tUJi4K4DXYWgMUX" />
    </div>
  );
};

export default SearchPage;
