import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const moveToRoomListPage = () => {
    navigate("roomlist");
  };

  return (
    <Flex direction="column" align="center">
      <Box
        style={{
          paddingTop: "10rem",
          height: "auto",
        }}
      >
        <Button>싱글 플레이</Button>
        <Button onClick={moveToRoomListPage}>멀티 플레이</Button>
      </Box>
    </Flex>
  );
};

export default MainPage;
