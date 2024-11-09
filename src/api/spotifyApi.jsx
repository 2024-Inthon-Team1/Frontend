// src/api/SpotifyApi.js

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // 실제 Spotify 클라이언트 ID
const REDIRECT_URI = 'http://localhost:5173/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'streaming user-read-playback-state user-modify-playback-state';

export const authenticateSpotify = () => {
  const token = new URLSearchParams(window.location.hash.substring(1)).get(
    'access_token'
  );
  if (token) {
    localStorage.setItem('spotifyAccessToken', token);
    window.location.hash = '';
  } else if (!localStorage.getItem('spotifyAccessToken')) {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPE)}&response_type=${RESPONSE_TYPE}`;
  }
};

export const getAccessToken = () => localStorage.getItem('spotifyAccessToken');
