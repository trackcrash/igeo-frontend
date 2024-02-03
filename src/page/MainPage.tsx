import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

const MainPage: React.FC = () => {
  return (
    <Flex direction="column" align="center">
      <Box
        style={{
          paddingTop: "10rem",
          height: "auto",
        }}
      >
        <Button>싱글 플레이</Button>
        <Button>멀티 플레이</Button>
      </Box>
    </Flex>
  );
};

export default MainPage;
