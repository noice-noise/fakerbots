import { useState } from 'react';
import { createContext } from 'react';

export type AuthUser = {
  name: string;
  auth: boolean;
};

type AuthContextType = {
  user: AuthUser;
  register: (user: AuthUser) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const guestUser = {
    name: 'Guestx',
    auth: false,
  };

  const [user, setUser] = useState<AuthUser>(guestUser);

  const register = (user: AuthUser) => {
    console.log({ user });
    setUser((_) => user);
  };

  const login = (user: AuthUser) => {
    setUser((_) => user);
  };

  const logout = () => {
    setUser((_) => guestUser);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
