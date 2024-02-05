import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import MusicMapEditTab from "./MusicQuestionEditTab";
import MusicMapInfoEditTab from "./MusicMapInfoEditTab";

import "../css/MusicMapRegisterPage.css";

const MusicMapEditPage: React.FC = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>맵 정보 수정</Tab>
        <Tab>문제 수정</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MusicMapInfoEditTab />
        </TabPanel>
        <TabPanel>
          <MusicMapEditTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MusicMapEditPage;
