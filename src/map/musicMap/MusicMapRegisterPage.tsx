import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react";
import AddSongsModal from "./AddSongsModal";

import "../css/MusicMapRegisterPage.css";

const MusicMapRegisterPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={openModal}>곡 추가</Button>
      <Modal id="addsongmodal" isCentered closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>곡 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddSongsModal />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MusicMapRegisterPage;
