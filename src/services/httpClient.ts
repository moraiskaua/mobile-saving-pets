import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const httpClient = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'http://10.0.2.2:8080',
});

export interface AuthDataProps {
  accessToken: string;
  userId: string;
}

httpClient.interceptors.request.use(async config => {
  const res = await AsyncStorage.getItem('@authData');
  const authData: AuthDataProps = JSON.parse(res as string);

  if (authData) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }

  return config;
});
