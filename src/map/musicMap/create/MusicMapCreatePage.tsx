import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import MusicMapInfoCreateTab from "./MusicMapInfoCreateTab";
import MusicQuestionCreateTab from "./MusicQuestionCreateTab";

const MusicMapCreatePage: React.FC = () => {
  return (
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
  );
};

export default MusicMapCreatePage;
