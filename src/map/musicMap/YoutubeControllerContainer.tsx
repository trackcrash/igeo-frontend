import React, { useRef, useState } from "react";
import { Box, Button, Flex, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";
import YouTube from "react-youtube";
import axios from "axios";

interface VideoDetails {
  items: Array<{
    contentDetails: {
      duration: string;
    };
  }>;
}

const timeOptions: number[] = [1, 5, 10, 30];

const YoutubeControllerContainer: React.FC = () => {
  const { originalLink, youtubeId, startTime, endTime, setOriginalLink, setYoutubeId, setStartTime, setEndTime } = useAddSongsModalStore();
  const generateSliderKey = `${startTime}-${endTime}`;
  const [sliderKey, setSliderKey] = useState<string>(generateSliderKey);
  const [parsedDuration, setParsedDuration] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const playerRef = useRef<YT.Player | null>(null);

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
          // duration으로 설정
          setEndTime("00:00:00");
        }
      }
    }
  };

  const parseDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/) || [];
    // eslint-disable-next-line
    const [_, hours, minutes, seconds] = match.map((part) => (part ? parseInt(part, 10) : 0));
    return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`;
  };

  const padWithZero = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

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

  const parseCurrentTime = (currentTime: number): string => {
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
  };

  const parseTimeToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const parsedSecond = hours * 3600 + minutes * 60 + seconds;
    return parsedSecond;
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

  const handleReady = (event: any) => {
    playerRef.current = event.target;
    const duration = event.target.getDuration();
    setDuration(duration);
    setSliderKey(generateSliderKey);
  };

  const handleCurrendTime = (isStartTime: boolean) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log(`현재 재생 시간: ${currentTime}초`);
      if (isStartTime) {
        setStartTime(parseCurrentTime(currentTime));
      } else {
        setEndTime(parseCurrentTime(currentTime));
      }
      setSliderKey(generateSliderKey);
    }
  };

  const handlePlayTime = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setStartTime(parseCurrentTime(currentTime));
      setEndTime(parseCurrentTime(currentTime + seconds));
      setSliderKey(generateSliderKey);
    }
  };

  return (
    <Flex direction="row" gap={"30px"}>
      <Flex flex={1} direction="column">
        <Box className="player-wrapper" mb={4}>
          {youtubeId ? (
            <YouTube iframeClassName="react-player" videoId={youtubeId} opts={opts} onReady={handleReady} />
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
        <RangeSlider
          key={sliderKey}
          m={"10px 0"}
          defaultValue={[parseTimeToSeconds(startTime), parseTimeToSeconds(endTime)]}
          max={duration}
          onChange={(val: number[]) => {
            setStartTime(parseCurrentTime(val[0]));
            setEndTime(parseCurrentTime(val[1]));
          }}
          isDisabled={!youtubeId}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Flex h={"40px"} mb={4}>
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
        <Flex justifyContent={"center"} mb={4} gap={6}>
          <Button onClick={() => handleCurrendTime(true)}>여기부터 재생</Button>
          <Button onClick={() => handleCurrendTime(false)}>여기까지 재생</Button>
        </Flex>
        <Flex justifyContent={"center"} mb={4} gap={4}>
          {timeOptions.map((seconds: number) => (
            <Button key={seconds} onClick={() => handlePlayTime(seconds)}>
              {`${seconds}초`}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default YoutubeControllerContainer;
