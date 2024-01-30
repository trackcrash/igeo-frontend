import React, { useRef } from "react";
import { Flex, Button, Divider, useDisclosure, useToast } from "@chakra-ui/react";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";
import YoutubeControllerContainer from "./YoutubeControllerContainer";
import QuestionInfoContainer from "./QuestionInfoContainer";
import AnswerTagContainer from "./AnswerTagContainer";
import ResetAlertDialog from "./ResetAlertDialog";

import "../css/AddSongsModal.css";

const AddSongsModal: React.FC = () => {
  const toast = useToast();
  const { originalLink, youtubeId, startTime, endTime, songTitle, artistName, genre, answers, resetState, setSongsInfo } = useAddSongsModalStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const clearInputFields = () => {
    resetState();
  };

  const handleSongsInfoChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSongsInfo({ originalLink, youtubeId, startTime, endTime, songTitle, artistName, genre, answers });
    clearInputFields();
  };

  const handleReset = () => {
    try {
      clearInputFields();
      onClose();
      toast({
        title: "초기화 완료",
        description: "입력하신 내용이 초기화되었습니다.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "초기화 실패",
        description: "초기화 중 오류가 발생했습니다.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column">
      <YoutubeControllerContainer />
      <Divider m={"4px 0"} />
      <QuestionInfoContainer />
      <Divider m={"4px 0"} />
      <AnswerTagContainer />
      <Divider m={"4px 0"} />
      <Flex m={6} justifyContent={"center"}>
        <Flex gap={2}>
          <Button minW={"150px"} colorScheme="green" onClick={handleSongsInfoChange}>
            등록
          </Button>
          <Button minW={"150px"} variant="outline" colorScheme="green" onClick={onOpen}>
            초기화
          </Button>
          <ResetAlertDialog cancelRef={cancelRef} onClose={onClose} isOpen={isOpen} onReset={handleReset} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddSongsModal;
