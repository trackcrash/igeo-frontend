import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkAuthorization: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthorization = useCallback((): boolean => {
    const userToken = localStorage.getItem("token");
    return !!userToken;
  }, []);

  const saveTokenFromUrl = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userToken = urlSearchParams.get("token");
    const userLevel = urlSearchParams.get("level");
    const userNickname = urlSearchParams.get("nickname");

    if (userLevel && userNickname && userToken) {
      localStorage.setItem("token", userToken);
      localStorage.setItem("userLevel", userLevel);
      localStorage.setItem("userNickname", userNickname);
      setIsLoggedIn(true);
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(checkAuthorization());
    saveTokenFromUrl();
  }, [checkAuthorization, saveTokenFromUrl]);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthorization }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthProvider밖에서 사용할 수 없습니다.");
  }
  return auth;
};
