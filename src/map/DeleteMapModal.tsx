import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Center,
  Text,
  Highlight,
  Input,
} from "@chakra-ui/react";

interface DeleteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleMapDelete: () => void;
  confirmText: string;
  selectedMapTitle: string | undefined;
  setConfirmText: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteMapModal: React.FC<DeleteMapModalProps> = ({ isOpen, onClose, handleMapDelete, confirmText, selectedMapTitle, setConfirmText }) => {
  return (
    <Modal isCentered closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>맵 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Text as={"b"} fontSize="lg" mb={1}>
              삭제한 맵은 복구할 수 없습니다.
            </Text>
          </Center>
          <Center>
            <Text as={"b"} fontSize="lg" mb={3}>
              계속 진행하시려면 아래 입력창에 맵 이름을 입력해주세요
            </Text>
          </Center>
          <br />
          <Text mb={2}>
            <Highlight query={`${selectedMapTitle}`} styles={{ px: "2", py: "1", rounded: "full", bg: "red.100", fontWeight: "bold" }}>
              {selectedMapTitle!}
            </Highlight>
          </Text>
          <Input placeholder={`${selectedMapTitle}`} onChange={(e) => setConfirmText(e.target.value)} />
        </ModalBody>
        <Button colorScheme="red" onClick={handleMapDelete} isDisabled={confirmText !== selectedMapTitle}>
          삭제
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMapModal;
