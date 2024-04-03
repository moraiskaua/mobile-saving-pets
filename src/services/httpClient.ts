import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const httpClient = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'http://10.0.2.2:8080',
});

httpClient.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
