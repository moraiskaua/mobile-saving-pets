import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  signedIn: boolean;
  userId: string;
  login: (userId: string, accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');
        setSignedIn(!!storedAccessToken);
        setUserId(userId);
      } catch (error) {
        console.error('Error checking sign-in status:', error);
      }
    };

    checkSignInStatus();
  }, []);

  const login = useCallback(async (userId: string, accessToken: string) => {
    await Promise.all([
      AsyncStorage.setItem('accessToken', accessToken),
      AsyncStorage.setItem('userId', userId),
    ]);
    setSignedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('userId'),
    ]);
    setSignedIn(false);
    setUserId(null);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        userId: userId!,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
