import { ReactNode, createContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: ({ name, password }: LoginProps) => void;
  logout: () => void;
}

interface LoginProps {
  name: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = ({ name, password }: LoginProps) => {};

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
