import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Spacer, useToast } from "@chakra-ui/react";
import { Button, Flex, Image } from "@chakra-ui/react";
import { useAuth } from "./AuthConText";
import AccountMenu from "./AccountMenu";
import { AxiosError } from "axios";
import { ColorModeSwitcher } from "ColorModeSwitcher";

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const toast = useToast();
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
        duration: 5000,
        isClosable: true,
      });
      window.location.href = "/";
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        toast({
          title: "페이지를 찾을 수 없습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "서버와 통신 중 오류가 발생했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
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
