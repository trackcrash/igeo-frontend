import { Flex, Text, Input, Radio, RadioGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAddSongsModalStore } from "../../store/AddSongsModalStore";
import { SelectedSongIdProps } from "./AddSongsModal";
import { useSongsListStore } from "../../store/SongsListStore";

const QuestionInfoContainer: React.FC<SelectedSongIdProps> = ({ selectedSongId }) => {
  const { songTitle, artistName, genre, setSongTitle, setArtistName, setGenre } = useAddSongsModalStore();

  const [genreEtc, setGenreEtc] = useState<string>("");

  useEffect(() => {
    if (selectedSongId !== null) {
      const song = useSongsListStore.getState().songs.find((s) => s.songId === selectedSongId);
      if (song) {
        setSongTitle(song.songTitle || "");
        setArtistName(song.artistName || "");
        setGenre(song.genre || "");
      }
    }
  }, [selectedSongId]);

  const handleSongTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongTitle(e.target.value);
  };

  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
  };

  const handleGenreEtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreEtc(e.target.value);
  };

  const genreOptions = [
    { value: "animation", label: "애니메이션" },
    { value: "jpop", label: "J-POP" },
    { value: "vocaloid", label: "보컬로이드" },
    { value: "etc", label: "직접입력" },
  ];

  return (
    <Flex direction={"column"}>
      <Text as="b" align={"start"} pl={"10px"} mb={"8px 0"}>
        문제 정보
      </Text>
      <Flex mb={4} gap={4}>
        <Input placeholder="곡 제목" value={songTitle} onChange={handleSongTitleChange} />
        <Input placeholder="가수 이름" value={artistName} onChange={handleArtistNameChange} />
      </Flex>
      <Flex mb={4}>
        <RadioGroup onChange={handleGenreChange} value={genre}>
          {genreOptions.map((option) => (
            <Radio key={option.value} value={option.value} mr={4}>
              {option.label}
            </Radio>
          ))}
          {genre === "etc" ? <Input placeholder="장르를 직접 입력하세요" value={genreEtc} onChange={handleGenreEtcChange} /> : <></>}
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default QuestionInfoContainer;
