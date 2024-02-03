import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  AspectRatio,
  ButtonGroup,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";

import { ColorModeSwitcher } from "../../ColorModeSwitcher";

type HeaderProps = {
  children?: ReactNode;
};

type ButtonOptions = {
  url: string;
  title: string;
  label: string;
};

const buttonOptions: ButtonOptions[] = [
  {
    url: "/img/chino.jpg",
    title: "music-quiz",
    label: "노래 퀴즈",
  },
  {
    url: "/img/fuyu.jpg",
    title: "image-quiz",
    label: "사진 퀴즈",
  },
];

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateMapButtonClick = () => {
    onOpen();
  };

  const handleMapButtonClick = (title: string) => {
    if (title === "music-quiz") {
      navigate("/music-map-register");
    } else if (title === "image-quiz") {
      alert("준비중입니다");
      // navigate("/image-map-register");
    }
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
        <Button onClick={handleCreateMapButtonClick}>맵 만들기</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>맵 타입을 선택하세요</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent="center" gap="10%">
                {buttonOptions.map((button: ButtonOptions) => (
                  <Button key={button.title} onClick={() => handleMapButtonClick(button.title)} w="100em" h="auto">
                    <AspectRatio ratio={1} width="100%" height="100%">
                      <Image src={button.url} alt={button.label} objectFit="cover" />
                    </AspectRatio>
                    {button.label}
                  </Button>
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>

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
