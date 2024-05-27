import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { AuthDataProps } from '../services/httpClient';
import { updatePasswordDto } from '../services/userService/updatePassword';
import { userService } from '../services/userService';

interface AuthContextType {
  signedIn: boolean;
  userId: string;
  login: (userId: string, accessToken: string) => void;
  logout: () => void;
  updatePassword: ({ password, oldPassword }: updatePasswordDto) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const res = await AsyncStorage.getItem('@authData');
        const authData: AuthDataProps = await JSON.parse(res as string);

        if (!authData) return logout();

        login(authData.userId, authData.accessToken);
      } catch (error) {
        console.error('Error checking sign-in status:', error);
      }
    };

    checkSignInStatus();
  }, []);

  const login = async (userId: string, accessToken: string) => {
    await AsyncStorage.setItem(
      '@authData',
      JSON.stringify({ accessToken, userId }),
    );
    setSignedIn(true);
    setUserId(userId);
  };

  const logout = async () => {
    await AsyncStorage.getItem('@authData');
    setSignedIn(false);
    setUserId(null);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const updatePassword = async ({
    password,
    oldPassword,
  }: updatePasswordDto) => {
    await userService.updatePassword(userId!, { password, oldPassword });
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        userId: userId!,
        login,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
