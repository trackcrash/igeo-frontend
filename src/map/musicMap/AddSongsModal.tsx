import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  Text,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";
import YouTubePlayer from "react-youtube";

import "../css/AddSongsModal.css";

interface VideoDetails {
  items: Array<{
    contentDetails: {
      duration: string;
    };
  }>;
}

const AddSongsModal: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState<[number, number]>([0, 0]);
  const {
    originalLink,
    youtubeId,
    startTime,
    endTime,
    songTitle,
    artistName,
    genre,
    answer,
    setOriginalLink,
    setYoutubeId,
    setStartTime,
    setEndTime,
    setSongTitle,
    setArtistName,
    setGenre,
    setAnswer,
    setSongsInfo,
  } = useAddSongsModalStore();

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(Number(e.target.value));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(Number(e.target.value));
  };

  const handleSongTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongTitle(e.target.value);
  };

  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleGenreChange = (genre: string) => {
    setGenre(genre);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const parseYoutubeVideoId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue: string = e.target.value;
    const extractedId = /(?:watch\?v=|youtu\.be\/)([^&]+)/;
    const match = enteredValue.match(extractedId);
    if (match && match[1]) {
      const extractedValue = match[1];
      setYoutubeId(extractedValue);
    } else {
      setYoutubeId(enteredValue);
    }
    setOriginalLink(enteredValue);
  };

  const clearInputFields = () => {
    setOriginalLink("");
    setYoutubeId("");
    setStartTime(null);
    setEndTime(null);
    setSongTitle("");
    setArtistName("");
    setGenre("");
    setAnswer("");
  };

  const handleSongsInfoChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSongsInfo({ originalLink, youtubeId, startTime, endTime, songTitle, artistName, genre, answer });
    clearInputFields();
  };

  const opts = {
    playerVars: {
      disablekb: 1,
      autoplay: 1,
      rel: 1,
      start: startTime,
      end: endTime,
    },
    width: "inherit",
    height: "inherit",
  };

  const fetchVideoLength = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=YOUTUBE_API_KEY`);
      const data: VideoDetails = await response.json();
      const duration = data.items[0].contentDetails.duration;
      const videoLengthInSeconds = duration.includes("M")
        ? duration.split("M").reduce((acc, val) => acc + parseInt(val.split("S")[0]) * 60, 0)
        : parseInt(duration.split("S")[0]);
      setDefaultValue([0, videoLengthInSeconds]);
    } catch (error) {
      console.error("Error fetching video length:", error);
    }
  };

  useEffect(() => {
    if (youtubeId) {
      fetchVideoLength();
    }
  }, [youtubeId]);

  return (
    <Flex direction="column" align="center">
      <Flex direction="row" gap={"30px"}>
        <Flex flex={1} direction="column">
          <Box className="player-wrapper" mb={4}>
            {youtubeId ? (
              <YouTubePlayer iframeClassName="react-player" videoId={youtubeId} opts={opts} />
            ) : (
              <Box
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: "black",
                }}
              >
                <Text fontSize={25} fontWeight={"bold"}>
                  링크를 추가해주세요
                </Text>
              </Box>
            )}
          </Box>
          <Box w={"100%"} mb={4}>
            <Input flex={3} placeholder="Youtube 링크를 입력하세요" value={originalLink} onChange={parseYoutubeVideoId} />
          </Box>
        </Flex>
        <Flex flex={1} flexDir={"column"}>
          <RangeSlider m={"10px"} aria-label={["min", "max"]} defaultValue={[0, 999]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <NumberInput>
            {startTime ? (
              <NumberInputField value={startTime} onChange={handleStartTimeChange} />
            ) : (
              <NumberInputField placeholder="시작 시간(초)" value={undefined} onChange={handleStartTimeChange} />
            )}
          </NumberInput>
          <NumberInput>
            {endTime ? (
              <NumberInputField value={endTime} onChange={handleEndTimeChange} />
            ) : (
              <NumberInputField placeholder="끝 시간(초)" value={undefined} onChange={handleEndTimeChange} />
            )}
          </NumberInput>
        </Flex>
      </Flex>
      <Box mb={4}>
        <Input placeholder="곡 제목" value={songTitle} onChange={handleSongTitleChange} />
        <Input placeholder="가수 이름" value={artistName} onChange={handleArtistNameChange} />
      </Box>
      <Box mb={4}>
        <RadioGroup onChange={handleGenreChange} value={genre}>
          <Radio value="animation">애니메이션</Radio>
          <Radio value="jpop">J-POP</Radio>
          <Radio value="vocaloid">보컬로이드</Radio>
          <Radio value="etc">나중에 장르 추가</Radio>
        </RadioGroup>
      </Box>
      <Box mb={4}>
        <Textarea placeholder="대충 해시태그 구현" value={answer} onChange={handleAnswerChange} />
      </Box>
      <Button onClick={handleSongsInfoChange}>등록</Button>
    </Flex>
  );
};

export default AddSongsModal;
