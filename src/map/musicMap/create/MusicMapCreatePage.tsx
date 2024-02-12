import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button, Stack } from "@chakra-ui/react";
import MusicMapInfoCreateTab from "./MusicMapInfoCreateTab";
import MusicQuestionCreateTab from "./MusicQuestionCreateTab";
import { useSongsListStore } from "../../store/SongsListStore";
import { useMusicMapCreateStore } from "../../store/MusicMapCreateStore";

const MusicMapCreatePage: React.FC = () => {
  const { songs } = useSongsListStore();
  const { thumbnailId, mapTitle, mapDescription, numberOfQustion, genre, isPublic } = useMusicMapCreateStore();

  const handleSaveMap = () => {
    console.log(songs);
    console.log(thumbnailId, mapTitle, mapDescription, numberOfQustion, genre, isPublic);
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
