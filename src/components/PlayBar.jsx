import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayBar = ({ track_id }) => {
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('spotifyAccessToken');
    if (savedToken) setToken(savedToken);

    if (token && track_id) {
      // 트랙 정보를 가져와서 duration 설정
      fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setDuration(data.duration_ms))
        .catch(error =>
          console.error('Failed to fetch track duration:', error)
        );
    }

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
            setPosition(state.position);
            setDuration(state.duration);
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
  }, [token, track_id]);

  useEffect(() => {
    let interval = null;
    if (!isPaused && player) {
      interval = setInterval(() => {
        player.getCurrentState().then(state => {
          if (state) setPosition(state.position);
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused, player]);

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPE)}&response_type=${RESPONSE_TYPE}`;
  };

  const togglePlayPause = () => {
    if (!deviceId || !isPlayerReady) return;

    if (isPaused) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track_id}`],
          position_ms: position,
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

  const formatTime = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {!token ? (
        <button onClick={handleLogin}>Spotify 로그인</button>
      ) : (
        <>
          <button
            onClick={togglePlayPause}
            disabled={!deviceId || !isPlayerReady}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
          {/* Progress Bar 컴포넌트 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <span>{formatTime(position)}</span> {/* 현재 시간 */}
            <div
              style={{
                flexGrow: 1,
                height: '10px',
                background: '#ccc',
                margin: '0 10px',
                position: 'relative',
                width: '50vw',
              }}
            >
              <div
                style={{
                  width: `${(position / duration) * 100}%`,
                  height: '100%',
                  background: '#1DB954',
                  position: 'absolute',
                }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span> {/* 총 시간 */}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayBar;
