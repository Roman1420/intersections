import { TokenStorageService } from './TokenStorageService.ts';
import ApiService from './ApiService.ts';

const TOKEN_KEY = 'token';

const saveToken = (token: string) => {
  TokenStorageService.saveToken(TOKEN_KEY, JSON.stringify(token));
};

export const getAuthToken = () => {
  const jsonToken = TokenStorageService.getToken(TOKEN_KEY);

  if (!jsonToken) {
    return null;
  }

  return JSON.parse(jsonToken);
};

export const getWebsocketAuthToken = async () => {
  const token = getAuthToken();

  if (!token) return;

  return await ApiService.get('/its_api/ws_auth', {
    'Authorization': `Basic ${token}`
  })
  .then((response) => {
    return response.data.data.token;
  });
};

export const deleteAuthToken = () => {
  TokenStorageService.deleteToken(TOKEN_KEY);
};

export const generateAuthToken = (login: string, password: string) => {
  const token = btoa(
    unescape(encodeURIComponent(login + ':' + password)),
  );

  saveToken(token);
  return token;
};


export const getUserLoginPassword = () => {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  const data = decodeURIComponent(escape(atob(token))).split(':');

  if (data.length !== 2) {
    return null;
  }

  return {
    login: data[0],
    password: data[1]
  };
};

export const generateBase64ForPassword = (password: string) => {
  return btoa(unescape(encodeURIComponent(password)));
};

export const getCurrentPasswordBase64 = () => {
  const userAllInformation = getUserLoginPassword();

  if (!userAllInformation) {
    return null;
  }

  return generateBase64ForPassword(userAllInformation.password);
};

export const updatePassword = (password: string) => {
  const userAllInformation = getUserLoginPassword();

  if (!userAllInformation) {
    return null;
  }

  generateAuthToken(userAllInformation.login, password);
};
