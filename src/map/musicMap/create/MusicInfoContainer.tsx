import React, { useEffect } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { SelectedSongIdProps } from "./AddSongsModal";
import { useAddSongsModalStore } from "../../store/AddSongsModalStore";
import { useSongsListStore } from "../../store/SongsListStore";

const MusicInfoContainer: React.FC<SelectedSongIdProps> = ({ selectedSongId }) => {
  const { songTitle, artistName, setSongTitle, setArtistName } = useAddSongsModalStore();

  useEffect(() => {
    if (selectedSongId !== null) {
      const song = useSongsListStore.getState().songs.find((s) => s.songId === selectedSongId);
      if (song) {
        setSongTitle(song.songTitle || "");
        setArtistName(song.artistName || "");
      }
    }
  }, [selectedSongId]);

  const handleSongTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongTitle(e.target.value);
  };

  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  return (
    <Flex direction={"column"}>
      <Text as="b" align={"start"} pl={"10px"} mb={2}>
        문제 정보
      </Text>
      <Flex mb={4} gap={4}>
        <Input placeholder="곡 제목" value={songTitle} onChange={handleSongTitleChange} />
        <Input placeholder="가수 이름" value={artistName} onChange={handleArtistNameChange} />
      </Flex>
    </Flex>
  );
};

export default MusicInfoContainer;
