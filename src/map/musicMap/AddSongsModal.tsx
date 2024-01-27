import React, { useState } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";
import YouTubePlayer from "react-youtube";
import axios from "axios";
import { FaLongArrowAltRight } from "react-icons/fa";

import "../css/AddSongsModal.css";

interface VideoDetails {
  items: Array<{
    contentDetails: {
      duration: string;
    };
  }>;
}

const AddSongsModal: React.FC = () => {
  const [parsedDuration, setParsedDuration] = useState<string>("");
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
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleTimeCheckRegex = (isStartTime: boolean) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (isStartTime) {
      if (!regex.test(startTime)) {
        setStartTime("00:00:00");
      }
    } else {
      if (!regex.test(endTime)) {
        if (originalLink) {
          setEndTime(parsedDuration);
        } else {
          setEndTime("00:00:00");
        }
      }
    }
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

  const parseYoutubeVideoId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue: string = e.target.value;
    const extractedId = /(?:watch\?v=|youtu\.be\/)([^&]+)/;
    const match = enteredValue.match(extractedId);
    if (match && match[1]) {
      const extractedValue = match[1];
      setYoutubeId(extractedValue);
      try {
        const apiKey = process.env.REACT_APP_YOUTUBE_API;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${extractedValue}&part=contentDetails&key=${apiKey}`);
        const videoDetails: VideoDetails = response.data;
        if (videoDetails.items.length > 0) {
          const duration = videoDetails.items[0].contentDetails.duration;
          console.log("Youtube 영상 길이:", duration);
          const parsed = parseDuration(duration);
          console.log("parsing된 영상 길이:", parsed);
          setParsedDuration(parsed);
          setEndTime(parsed);
        }
      } catch (error) {
        console.error("Youtube 영상 세부 정보를 가져오는 중 오류 발생:", error);
      }
    } else {
      setYoutubeId(enteredValue);
    }
    setOriginalLink(enteredValue);
  };

  const parseDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match && match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match && match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match && match[3] ? parseInt(match[3], 10) : 0;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  };

  const parseTimeToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const parsedSecond = hours * 3600 + minutes * 60 + seconds;
    return parsedSecond;
  };

  const clearInputFields = () => {
    setOriginalLink("");
    setYoutubeId("");
    setStartTime("");
    setEndTime("");
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
      start: parseTimeToSeconds(startTime),
      end: parseTimeToSeconds(endTime),
    },
    width: "inherit",
    height: "11.25em",
  };

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
                width="inherit"
                height="11.25em"
              >
                <Text fontSize={20} fontWeight={"bold"}>
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
          <RangeSlider m={"10px 0"} aria-label={["min", "max"]} isDisabled={!youtubeId}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Flex h={"40px"}>
            <Input
              className="song-playtime-picker"
              placeholder="시작 시간"
              value={startTime}
              onChange={handleStartTimeChange}
              onBlur={() => handleTimeCheckRegex(true)}
            />
            <FaLongArrowAltRight
              style={{
                flex: "1",
                height: "auto",
                padding: "12px 5px",
                background: "rgb(255, 250, 235)",
                color: "black",
              }}
            />
            <Input
              className="song-playtime-picker"
              placeholder="끝 시간"
              value={endTime}
              onChange={handleEndTimeChange}
              onBlur={() => handleTimeCheckRegex(false)}
            />
          </Flex>
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
