import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Flex, AspectRatio, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CreateMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ButtonOptions {
  url: string;
  title: string;
  label: string;
}

const buttonOptions: ButtonOptions[] = [
  {
    url: "/img/chino.jpg",
    title: "music-quiz",
    label: "음악 퀴즈",
  },
  {
    url: "/img/fuyu.jpg",
    title: "image-quiz",
    label: "사진 퀴즈",
  },
];

const CreateMapModal: React.FC<CreateMapModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleMapButtonClick = (title: string) => {
    if (title === "music-quiz") {
      navigate("/map/create/music");
    } else if (title === "image-quiz") {
      alert("준비중입니다");
      // navigate("/image-map-register");
    }
  };

  return (
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
  );
};

export default CreateMapModal;
