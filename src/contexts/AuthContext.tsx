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
  login: (userId: string, accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        setSignedIn(!!storedAccessToken);
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
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
