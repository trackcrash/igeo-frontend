import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Button, Flex, Image } from "@chakra-ui/react";
import { useAuth } from "./AuthConText";
import AccountMenu from "./AccountMenu";
import { AxiosError } from "axios";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import useChakraToast from "utility/useChakraToast";

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const toast = useChakraToast();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      // await userLogout();
      localStorage.removeItem("token");
      localStorage.removeItem("userLevel");
      localStorage.removeItem("userNickname");
      setIsLoggedIn(false);

      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.delete("token");
      urlSearchParams.delete("userLevel");
      urlSearchParams.delete("userNickname");
      window.history.replaceState({}, document.title, `${window.location.pathname}?${urlSearchParams.toString()}`);
      toast({
        title: "로그아웃했습니다.",
        status: "success",
      });
      window.location.href = "/";
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        toast({
          title: "페이지를 찾을 수 없습니다.",
          status: "error",
        });
      } else {
        toast({
          title: "서버와 통신 중 오류가 발생했습니다.",
          status: "error",
        });
      }
    }
  };

  const moveToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Flex m={3} minWidth="max-content" alignItems="center">
      <ChakraLink as={ReactRouterLink} to="/">
        <Image boxSize="80px" objectFit="cover" alt="logo" src="/img/doge.png" />
      </ChakraLink>
      <Spacer />
      <Flex>
        {/* <AccountMenu handleLogout={handleLogout} /> */}
        {isLoggedIn ? (
          <AccountMenu handleLogout={handleLogout} />
        ) : (
          <Button colorScheme="green" onClick={moveToLoginPage}>
            로그인
          </Button>
        )}
      </Flex>
      <ColorModeSwitcher />
      {children}
    </Flex>
  );
};

export default Header;
