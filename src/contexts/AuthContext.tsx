import axios from 'axios';
import { ReactNode, createContext, useState } from 'react';
import { api } from '../utils/api';

interface AuthContextType {
  token: string | null;
  login: ({ email, password }: LoginProps) => void;
  logout: () => void;
}

interface LoginProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async ({ email, password }: LoginProps) => {
    try {
      const { data } = await api.post('/users/login', {
        email,
        password,
      });
      setToken(data.accessToken);
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
