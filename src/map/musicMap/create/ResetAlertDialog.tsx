import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface ResetAlertDialogProps {
  cancelRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
  onReset: () => void;
}

const ResetAlertDialog: React.FC<ResetAlertDialogProps> = ({ cancelRef, onClose, isOpen, onReset }) => {
  return (
    <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>초기화</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          입력하신 내용이 전부 삭제됩니다.
          <br />
          정말 초기화할까요?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            아니오
          </Button>
          <Button colorScheme="red" ml={3} onClick={onReset}>
            네
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetAlertDialog;
