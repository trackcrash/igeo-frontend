import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button, Stack } from "@chakra-ui/react";
import MusicMapInfoCreateTab from "./MusicMapInfoCreateTab";
import MusicQuestionCreateTab from "./MusicQuestionCreateTab";
import { useSongsListStore } from "map/store/SongsListStore";
import { useMusicMapCreateStore } from "map/store/MusicMapCreateStore";
import { MusicInfo, MusicMapRequestForm } from "map/entity/request/MusicMapRequestForm";
import { registerMusicMap } from "map/api/mapApi";

const MusicMapCreatePage: React.FC = () => {
  const { songs } = useSongsListStore();
  const { thumbnail, mapName, description, numberOfQuestion, genre, isPublic } = useMusicMapCreateStore();

  const handleSaveMap = async () => {
    const parsedMusicInfo: MusicInfo[] = songs.map((song) => ({
      id: song.songId,
      title: song.artistName,
      song: song.songTitle,
      youtube_url: song.youtubeId,
      answer: `[${song.answersList.map(({ answers }) => answers.join(",")).join("]/[")}]`,
      hint: song.hint,
      startTime: song.startTime,
      endTime: song.endTime,
      category: song.categories.map((category) => `[${category}:0]`).join(","),
    }));

    const musicMapRequestData: Omit<MusicMapRequestForm, "MapProducer" | "id" | "user_id"> & { genre: string } = {
      mapName: mapName,
      thumbnail: thumbnail,
      active: isPublic,
      PlayNum: numberOfQuestion,
      Description: description,
      genre: genre,
      musics: parsedMusicInfo,
    };
    console.log(musicMapRequestData);

    try {
      // await registerMusicMap(musicMapRequestData);
    } catch {}
  };

  return (
    <Stack>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>맵 정보 등록</Tab>
          <Tab>문제 등록</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MusicMapInfoCreateTab />
          </TabPanel>
          <TabPanel>
            <MusicQuestionCreateTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={handleSaveMap}>저장</Button>
    </Stack>
  );
};

export default MusicMapCreatePage;
