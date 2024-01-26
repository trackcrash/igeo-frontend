import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface ButtonOptions {
  url: string;
  title: string;
  label: string;
}

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

const MainPage: React.FC = () => {
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

  return (
    <Flex direction="column" align="center">
      <Box
        style={{
          paddingTop: "10rem",
          height: "auto",
        }}
      >
        <Button>싱글 플레이</Button>
        <Button>멀티 플레이</Button>
      </Box>
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
    </Flex>
  );
};

export default MainPage;
