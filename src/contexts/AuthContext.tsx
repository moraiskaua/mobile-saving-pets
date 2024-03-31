import { ReactNode, createContext, useState } from 'react';
import { api } from '../utils/api';
import { useNavigation } from '@react-navigation/native';

interface AuthContextType {
  token: string | null;
  signup: ({ name, email, password, cpf, phone }: SignupProps) => void;
  login: ({ email, password }: LoginProps) => void;
  logout: () => void;
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const signup = async ({ name, email, password, cpf, phone }: SignupProps) => {
    try {
      await api.post('/users', {
        name,
        email,
        password,
        cpf,
        phone,
      });
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

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
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
