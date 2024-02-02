import React, { useEffect, useRef, useState } from "react";
import { Flex, Button, Divider, useDisclosure, useToast, Text } from "@chakra-ui/react";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";
import YoutubeControllerContainer from "./YoutubeControllerContainer";
import QuestionInfoContainer from "./QuestionInfoContainer";
import AnswerTagContainer from "./AnswerTagContainer";
import ResetAlertDialog from "./ResetAlertDialog";
import { getSongDetail, songRegister } from "../api/mapApi";
import { SongInfo } from "../entity/SongInfo";

import "../css/AddSongsModal.css";

interface AddSongsModalProps {
  selectedSongId: number | null;
}

const AddSongsModal: React.FC<AddSongsModalProps> = ({ selectedSongId }) => {
  const toast = useToast();
  const { youtubeId, startTime, endTime, songTitle, artistName, genre, answers, resetState } = useAddSongsModalStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSongDetailData = async () => {
      if (selectedSongId) {
        try {
          const data = await getSongDetail(selectedSongId);
          setSongInfo(data);
        } catch (error) {
          toast({
            title: "곡 정보 로드 실패",
            description: "곡 정보를 가져오는 중 오류가 발생했습니다.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    };
    if (selectedSongId !== null) {
      fetchSongDetailData();
    } else {
      setIsLoading(true);
    }
  }, [selectedSongId]);

  const clearInputFields = () => {
    resetState();
  };

  const showToast = (title: string) => {
    return toast({
      title,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSongsInfoChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!youtubeId) return showToast("영상을 등록해주세요");
    if (!songTitle) return showToast("노래 제목을 작성해주세요");
    if (!artistName) return showToast("가수 이름을 작성해주세요");
    if (!genre) return showToast("장르를 선택해주세요");
    if (!answers.length) return showToast("정답을 입력해주세요");

    await songRegister({ youtubeId, startTime, endTime, songTitle, artistName, genre, answers });
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
      {isLoading ? (
        <>
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
        </>
      ) : (
        <Text>곡 정보를 불러오는 중</Text>
      )}
    </Flex>
  );
};

export default AddSongsModal;
