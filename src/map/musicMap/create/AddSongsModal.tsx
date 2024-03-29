import React, { useRef } from "react";
import { Flex, Button, Divider, useDisclosure } from "@chakra-ui/react";
import YoutubeControllerContainer from "./YoutubeControllerContainer";
import MusicInfoContainer from "./MusicInfoContainer";
import AnswerContainer from "./AnswerContainer";
import ResetAlertDialog from "./ResetAlertDialog";
import { useAddSongsModalStore } from "map/store/AddSongsModalStore";
import { useSongsListStore } from "map/store/SongsListStore";
import useChakraToast from "utility/useChakraToast";

import "map/css/AddSongsModal.css";

export interface SelectedSongIdProps {
  selectedSongId: number | null;
}

type AddSongsModalProps = SelectedSongIdProps & {
  onModalClose: () => void;
};

const AddSongsModal: React.FC<AddSongsModalProps> = ({ selectedSongId, onModalClose }) => {
  const toast = useChakraToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { categories, answersList, setCategories, setAnswersList, resetState } = useAddSongsModalStore();

  const clearInputFields = () => {
    resetState();
  };

  const handleRemoveEmptyForm = () => {
    const emptyFormIndex = categories.findIndex((category) => category.trim() === "");
    if (emptyFormIndex !== -1) {
      const newCategories = [...categories];
      const newAnswersList = [...answersList];
      newCategories.splice(emptyFormIndex, 1);
      newAnswersList.splice(emptyFormIndex, 1);
      setCategories(newCategories);
      setAnswersList(newAnswersList);
    }
  };

  const handleSongsInfoChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { youtubeId, startTime, endTime, songTitle, artistName, hint, categories, answersList } = useAddSongsModalStore.getState();
      const songData = {
        youtubeId,
        startTime,
        endTime,
        songTitle,
        artistName,
        hint,
        categories,
        answersList,
      };
      if (!selectedSongId) {
        useSongsListStore.getState().addSong(songData);
      } else {
        useSongsListStore.getState().updateSong(selectedSongId, songData);
      }
      toast({
        title: "저장 완료",
        description: "입력하신 내용이 저장되었습니다.",
        status: "success",
      });
    } catch {
      toast({
        title: "저장 실패",
        description: "노래 정보 저장 중 오류가 발생했습니다.",
        status: "error",
      });
    }
    onModalClose();
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
      });
    } catch {
      toast({
        title: "초기화 실패",
        description: "초기화 중 오류가 발생했습니다.",
        status: "error",
      });
    }
  };

  return (
    <Flex direction="column">
      <YoutubeControllerContainer selectedSongId={selectedSongId} />
      <MusicInfoContainer selectedSongId={selectedSongId} />
      <AnswerContainer selectedSongId={selectedSongId} />
      <Divider m={"4px 0"} />
      <Flex m={6} justifyContent={"center"}>
        <Flex gap={2}>
          <Button
            minW={"150px"}
            colorScheme="green"
            onClick={(e) => {
              handleRemoveEmptyForm();
              handleSongsInfoChange(e);
            }}
          >
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
