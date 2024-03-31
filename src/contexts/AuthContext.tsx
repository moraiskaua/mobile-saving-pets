import { ReactNode, createContext, useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  signedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = AsyncStorage.getItem('accessToken');

    return !!storedAccessToken;
  });

  const login = useCallback((accessToken: string) => {
    AsyncStorage.setItem('accessToken', accessToken);
    setSignedIn(true);
  }, []);

  const logout = useCallback(() => {
    AsyncStorage.removeItem('accessToken');
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
