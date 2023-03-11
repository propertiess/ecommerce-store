import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

import { AuthEnum, RoleEnum } from '@/utils/consts';

type AuthContextProps = {
  token: string;
  setAuthToken: (token: string) => void;
  removeToken: () => void;
  isAdmin: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const [authToken, setToken] = useState('');

  const setAuthToken = (token: string) => {
    setToken(token);
    setCookie(AuthEnum.TOKEN, token);
  };

  useEffect(() => {
    hasCookie(AuthEnum.TOKEN) && setToken(getCookie(AuthEnum.TOKEN) as string);
  }, []);

  const removeToken = () => {
    setToken('');
    deleteCookie(AuthEnum.TOKEN);
  };

  const isAdmin = !!authToken && atob(authToken) === RoleEnum.ADMIN;
  const isUser = !!authToken && atob(authToken) === RoleEnum.USER;

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        setAuthToken,
        removeToken,
        isUser,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
