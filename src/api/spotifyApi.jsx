import axios from 'axios';
import dayjs from 'dayjs';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'streaming user-read-playback-state user-modify-playback-state';

export const authenticateSpotify = () => {
  const token = new URLSearchParams(window.location.hash.substring(1)).get(
    'access_token'
  );
  const expiresIn = new URLSearchParams(window.location.hash.substring(1)).get(
    'expires_in'
  );

  if (token) {
    localStorage.setItem(
      'spotifyAccessToken',
      'BQApxPW6LpK9AikvI3Im-V0cyJ8sBDECOoL4L3yErZ0O6xeZf8mtOca4bvaVfbs9vR2vSacz0UOXL6sUB9GGYNLnpuhbgfUZz3co8m-tOVtUvGmr5mjDKuq9UrQEw0k3KrI_UoE6n9uHKPpn2XbaVQgyeISwZ-01J-2BQmfm3xoVip10bfDsJ4c3PNH5GmmCUALk9ynAE5zFwmRP9UXWRclrX2U'
    );
    localStorage.setItem(
      'spotifyTokenExpiry',
      dayjs().add(expiresIn, 'second').toISOString()
    );
    window.location.hash = '';
  } else if (!localStorage.getItem('spotifyAccessToken')) {
    redirectToSpotifyAuth();
  }
};

const redirectToSpotifyAuth = () => {
  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPE)}&response_type=${RESPONSE_TYPE}`;
};

export const getAccessToken = () => {
  const token = localStorage.getItem('spotifyAccessToken');
  const expiry = localStorage.getItem('spotifyTokenExpiry');

  if (!token || !expiry || dayjs().isAfter(dayjs(expiry))) {
    redirectToSpotifyAuth();
    return null; // 반환을 중단하여 이후의 요청이 진행되지 않도록 함
  }

  return token;
};
