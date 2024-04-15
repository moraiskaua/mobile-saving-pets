import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('userId', userId);
    setSignedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    setSignedIn(false);
    setUserId(null);
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
