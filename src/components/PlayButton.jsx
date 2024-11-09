import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayButton = ({ track_id }) => {
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [position, setPosition] = useState(0); // 현재 위치 저장
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('spotifyAccessToken');
    if (savedToken) setToken(savedToken);

    const existingScript = document.querySelector(
      'script[src="https://sdk.scdn.co/spotify-player.js"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (token) {
        const playerInstance = new window.Spotify.Player({
          name: 'Spotify Web Player',
          getOAuthToken: cb => cb(token),
          volume: 0.5,
        });

        playerInstance.addListener('ready', ({ device_id }) => {
          setDeviceId(device_id);
          setIsPlayerReady(true);
        });

        playerInstance.addListener('player_state_changed', state => {
          if (state) {
            setIsPaused(state.paused);
            setPosition(state.position); // 현재 위치 업데이트
          }
        });

        playerInstance.connect().then(success => {
          if (success) setPlayer(playerInstance);
        });
      }
    };

    return () => {
      if (player) player.disconnect();
    };
  }, [token]);

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPE)}&response_type=${RESPONSE_TYPE}`;
  };

  const togglePlayPause = () => {
    if (!deviceId || !isPlayerReady) return;

    if (isPaused) {
      // 일시정지 위치에서 재생
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track_id}`],
          position_ms: position, // 현재 위치에서 재생 시작
        }),
      })
        .then(response => {
          if (response.ok) setIsPaused(false);
        })
        .catch(error => console.error('Playback request error:', error));
    } else {
      player
        .pause()
        .then(() => setIsPaused(true))
        .catch(error => console.error('Pause error:', error));
    }
  };

  return (
    <div>
      {!token ? (
        <button onClick={handleLogin}>Spotify 로그인</button>
      ) : (
        <button
          onClick={togglePlayPause}
          disabled={!deviceId || !isPlayerReady}
        >
          {isPaused ? <FaPlay /> : <FaPause />}
        </button>
      )}
    </div>
  );
};

export default PlayButton;
