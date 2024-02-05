import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { ButtonGroup, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";

import { ColorModeSwitcher } from "../../ColorModeSwitcher";

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleCreateMapButtonClick = () => {
    navigate("/my-map");
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Flex m={3} minWidth="max-content" alignItems="center">
      <ChakraLink as={ReactRouterLink} to="/">
        <Image boxSize="80px" objectFit="cover" alt="logo" src="/img/doge.png" />
      </ChakraLink>
      <Spacer />
      <Box p="2">
        <Heading fontSize="4xl" colorScheme="green">
          아이거...
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup>
        <Button onClick={handleCreateMapButtonClick}>내 퀴즈 목록</Button>
        <Button colorScheme="green" onClick={goToLoginPage}>
          로그인
        </Button>
      </ButtonGroup>
      <ColorModeSwitcher />
      {children}
    </Flex>
  );
};

export default Header;
