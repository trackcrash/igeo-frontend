import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Button, Flex, Image } from "@chakra-ui/react";
import { useAuth } from "./AuthConText";

import { ColorModeSwitcher } from "ColorModeSwitcher";
import AccountMenu from "./AccountMenu";

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
    } catch (error) {}
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
