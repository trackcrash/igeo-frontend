import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, Input, InputGroup, InputLeftElement, Stack, useDisclosure } from "@chakra-ui/react";
import RoomListPage from "game/multi/RoomListPage";
import { useRoomListQuery } from "game/api/roomListApi";
import { RoomInfo } from "game/entity/RoomInfo";
import { FaSearch } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import RoomCreateModal from "./RoomCreateModal";

const DummyRoomList = [
  {
    mapType: "MUSIC",
    thumbnail: "AjspnMNkGu8",
    roomName: "노래 맞히기 할사람",
    roomMaster: "bbibi",
    mapName: "대충 노래 맞히기 맵 샘플",
    numberOfQuestion: 50,
    isPublic: true,
    isPlaying: "PLAYING",
    playerNum: 4,
  },
  {
    mapType: "IMAGE",
    thumbnail: "PxF9hCmaBy4",
    roomName: "노래 맞히기 할사람2",
    roomMaster: "bbibi",
    mapName: "대충 이미지 맞히기 맵 샘플",
    numberOfQuestion: 30,
    isPublic: false,
    isPlaying: "WAITING",
    playerNum: 2,
  },
];

const RoomListPageMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { data: roomList, isLoading, isError, refetch } = useRoomListQuery();
  const [selectedMapTypes, setSelectedMapTypes] = useState<string[]>(["music-quiz", "image-quiz"]);
  const [showPublicRoomOnly, setShowPublicRoomOnly] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [manualRefetchAllowed, setManualRefetchAllowed] = useState<boolean>(true);

  const handleFocusChange = () => {
    setIsFocused((prev) => !prev);
  };

  const handleManualRefetch = () => {
    if (manualRefetchAllowed) {
      setManualRefetchAllowed(false);
      refetch();
      console.log("manually refetched");
      setTimeout(() => {
        setManualRefetchAllowed(true);
      }, 5000);
    }
  };

  useEffect(() => {
    window.addEventListener("focus", handleFocusChange);
    window.addEventListener("blur", handleFocusChange);
    return () => {
      window.removeEventListener("focus", handleFocusChange);
      window.removeEventListener("blur", handleFocusChange);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isFocused) {
        refetch();
        console.log("refetched");
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [isFocused, refetch]);

  const handleCheckboxChange = (value: string) => {
    setSelectedMapTypes((prev) => {
      if (prev.includes(value)) {
        return prev.length > 1 ? prev.filter((type) => type !== value) : prev;
      } else {
        return [...prev, value];
      }
    });
  };

  const handleShowPublicRoomOnly = () => {
    setShowPublicRoomOnly((prev) => !prev);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const filteredRooms = useMemo(() => {
    return DummyRoomList?.filter((room) => {
      const matchesMapType = selectedMapTypes.includes(room.mapType.toLowerCase() + "-quiz");
      const matchesShowPublic = showPublicRoomOnly ? room.isPublic : true;
      const matchesSearchKeyword = room.roomName.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchesMapType && matchesShowPublic && matchesSearchKeyword;
    });
  }, [selectedMapTypes, showPublicRoomOnly, searchKeyword, DummyRoomList]);

  return (
    <Box p={4}>
      <Stack>
        <Center as="b" fontSize="3xl">
          멀티플레이 룸
        </Center>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDirection={"column"}>
            <CheckboxGroup colorScheme="green">
              <Stack mb={2} spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox isChecked={selectedMapTypes.includes("music-quiz")} onChange={() => handleCheckboxChange("music-quiz")}>
                  음악퀴즈
                </Checkbox>
                <Checkbox isChecked={selectedMapTypes.includes("image-quiz")} onChange={() => handleCheckboxChange("image-quiz")}>
                  사진퀴즈
                </Checkbox>
              </Stack>
            </CheckboxGroup>
            <Stack mb={4}>
              <Checkbox isChecked={showPublicRoomOnly} onChange={handleShowPublicRoomOnly}>
                비공개 방 숨기기
              </Checkbox>
            </Stack>
          </Flex>
          <Flex mb={2} gap={1} flexDirection={"column"}>
            <Flex gap={1}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSearch />
                </InputLeftElement>
                <Input placeholder="방 이름 검색" value={searchKeyword} onChange={handleSearch} />
              </InputGroup>
              <Button leftIcon={<IoMdRefresh />} onClick={handleManualRefetch} isDisabled={!manualRefetchAllowed} colorScheme="green">
                새로고침
              </Button>
            </Flex>
            <Flex justifyContent={"flex-end"}>
              <Button onClick={onOpen}>방 생성</Button>
              <RoomCreateModal cancelRef={cancelRef} onClose={onClose} isOpen={isOpen} />
            </Flex>
          </Flex>
        </Flex>
      </Stack>
      {filteredRooms && filteredRooms.length > 0 ? (
        <RoomListPage roomList={filteredRooms} isLoading={isLoading} isError={isError} />
      ) : (
        <Center m={"15em 0"}>조건에 맞는 방이 없습니다.</Center>
      )}
    </Box>
  );
};

export default RoomListPageMenu;
