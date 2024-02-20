import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { CreateRoom } from "../entity/CreateRoom";

interface ResetAlertDialogProps {
  cancelRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
}

const RoomCreateModal: React.FC<ResetAlertDialogProps> = ({ cancelRef, onClose, isOpen }) => {
  const toast = useToast();
  const [roomName, setRoomName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [maxUser, setMaxUser] = useState<number>(8);

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleMaxUserChange = (_: string, valueNumber: number) => {
    setMaxUser(valueNumber);
  };

  const handleCreateRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // const roomData: CreateRoom = {
      //   type: password.length > 0 ? "PRIVATE": "PUBLIC",
      //   roomName: roomName,
      //   sender: ,
      //   password: password,
      //   maxUser: maxUser,
      // };
    } catch {
      toast({
        title: "방 생성 실패",
        description: "방 생성 중 오류가 발생했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent minH={"25em"}>
        <AlertDialogHeader>방 생성</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Stack>
            <Flex>방 이름</Flex>
            <Input placeholder={`님의 방`} value={roomName} onChange={handleRoomNameChange} />
          </Stack>
          <Stack>
            <Flex>비밀번호</Flex>
            <Input placeholder="비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} />
          </Stack>
          <Stack>
            <Flex>최대 인원 설정</Flex>
            <NumberInput defaultValue={maxUser} min={2} max={8} onChange={handleMaxUserChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="green" ml={3} onClick={handleCreateRoom}>
            생성
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RoomCreateModal;
