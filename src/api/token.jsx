import apiClient from './apiClient';

const TOKEN_EXPIRY_TIME = 60 * 1000;

export const setCookies = (accessToken, refreshToken) => {
  const issueTime = Date.now();
  document.cookie = `access_token=${accessToken}; path=/; max-age=60; SameSite=Strict;`;
  document.cookie = `refresh_token=${refreshToken}; path=/; max-age=604800; SameSite=Strict;`;
  document.cookie = `issue_time=${issueTime}; path=/; max-age=60; SameSite=Strict;`;
};

export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export const logout = () => {
  document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict;';
  document.cookie = 'refresh_token=; path=/; max-age=0; SameSite=Strict;';
  document.cookie = 'issue_time=; path=/; max-age=0; SameSite=Strict;';
  window.location.href = '/';
};

export const isTokenExpired = () => {
  const issueTime = getCookie('issue_time');
  if (!issueTime) {
    return true;
  }
  const now = Date.now();
  return now - parseInt(issueTime, 10) >= TOKEN_EXPIRY_TIME;
};

export const refreshingToken = async () => {
  const refresh_token = getCookie('refresh_token');
  if (!refresh_token) throw new Error('리프레시 토큰이 없습니다.');

  const response = await apiClient.post('/auth/refresh', {
    refreshToken: refresh_token,
  });

  const { access_token } = response.data;

  setCookies(access_token, refresh_token);

  return access_token;
};
