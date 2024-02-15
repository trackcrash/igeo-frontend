import React, { useEffect, useState } from "react";
import { Box, Center, Flex, HStack, Image, SimpleGrid, Tag, TagLabel, TagLeftIcon, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMyMapListQuery } from "map/api/mapApi";
import { FiPlay, FiImage, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";
import { RiMusic2Fill } from "react-icons/ri";
import { useMapInfoStore } from "map/store/MapInfoStore";
import CreateMapModal from "./CreateMapModal";
import DeleteMapModal from "./DeleteMapModal";
import { MapInfo } from "./entity/MapInfo";

interface DummyOptions {
  missionId: number;
  mapType: string;
  thumbnailId: string;
  mapTitle: string;
  mapDescription: string;
  numberOfQustion: number;
  isPublic: boolean;
}

const dummyItems: MapInfo[] = [
  {
    missionId: 1,
    mapType: "MUSIC",
    thumbnailId: "AjspnMNkGu8",
    mapTitle: "대충 노래 맞히기 맵 샘플",
    mapDescription: "대충 맵설명",
    numberOfQustion: 50,
    isPublic: true,
  },
  {
    missionId: 2,
    mapType: "IMAGE",
    thumbnailId: "PxF9hCmaBy4",
    mapTitle: "대충 이미지 맞히기 맵 샘플",
    mapDescription: "이거 줄 넘어가면 어떻게 되는거지 이거 줄 넘어가면 어떻게 되는거지",
    numberOfQustion: 30,
    isPublic: false,
  },
];

const MapSelectPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mapInfo, setMapInfo } = useMapInfoStore();
  const [selectedMapTitle, setSelectedMapTitle] = useState<string>();
  const [selectedMapId, setSelectedMapId] = useState<number>();
  const [confirmText, setConfirmText] = useState<string>("");
  const [isDeleteMapModalOpen, setIsDeleteMapModalOpen] = useState<boolean>(false);
  const [isCreateMapModalOpen, setCreateMapModalOpen] = useState<boolean>(false);
  const { data: mapList, isLoading, isError } = useMyMapListQuery();

  const openDeleteMapModal = (title: string, missionId: number) => {
    setSelectedMapTitle(title);
    setSelectedMapId(missionId);
    setIsDeleteMapModalOpen(true);
  };

  const closeDeleteMapModal = () => {
    setIsDeleteMapModalOpen(false);
    setConfirmText("");
  };

  const openCreateMapModal = () => {
    setCreateMapModalOpen(true);
  };

  const closeCreateMapModal = () => {
    setCreateMapModalOpen(false);
  };

  useEffect(() => {
    setMapInfo(dummyItems);
  }, []);

  // useEffect(() => {
  //   const fetchSongListData = async () => {
  //     try {
  //       // const data = await getMyMapList();
  //       setMapInfo(dummyItems);
  //     } catch (error) {
  //       toast({
  //         title: "곡 목록 로드 실패",
  //         description: "곡 목록를 가져오는 중 오류가 발생했습니다.",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     }
  //   };
  //   fetchSongListData();
  // }, []);

  const moveToSelectedMap = (type: string, missionId: number) => {
    navigate(`/map/edit/${type.toLowerCase()}/${missionId}`);
  };

  const handleIsPublicChange = async (missionId: number) => {
    const mapIndex = mapInfo.findIndex((map) => map.missionId === missionId);
    if (mapIndex !== -1) {
      const updatedMapInfo = [...mapInfo];
      updatedMapInfo[mapIndex] = {
        ...updatedMapInfo[mapIndex],
        isPublic: !updatedMapInfo[mapIndex].isPublic,
      };
      setMapInfo(updatedMapInfo);
      // await updateMapInfo(mapInfo);
    }
  };

  const handleMapDelete = () => {
    console.log("맵제목", selectedMapTitle);
    console.log(selectedMapId, "번 맵 삭제");
  };

  if (isLoading) {
    return <Center>로딩중</Center>;
  }

  if (isError) {
    return <Center>맵 정보를 가져오는 도중 오류가 발생했습니다.</Center>;
  }

  return (
    <Box p={4}>
      <Center>
        <Text as="b" fontSize="3xl" mb={4}>
          맵 목록
        </Text>
      </Center>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {dummyItems.map((map: MapInfo, idx: number) => (
          <Box
            key={idx}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            border="1px solid #bbbbbb"
            onClick={() => moveToSelectedMap(map.mapType, map.missionId)}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }}
          >
            <Image
              src={`https://img.youtube.com/vi/${map.thumbnailId}/hqdefault.jpg`}
              alt={`${map.thumbnailId}`}
              borderTopRadius="md"
              objectFit="cover"
              w="100%"
              h="200px"
            />
            <Box p={4}>
              <Center>
                <Tooltip label={map.mapTitle}>
                  <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" as={"b"} fontSize={"xl"} mb={2}>
                    {map.mapTitle}
                  </Text>
                </Tooltip>
              </Center>
              <Tooltip label={map.mapDescription}>
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontSize={"sm"} mb={4}>
                  {map.mapDescription}
                </Text>
              </Tooltip>
              <HStack spacing={4} justifyContent={"space-between"}>
                <Flex gap={3}>
                  {map.mapType === "MUSIC" ? (
                    <Tag variant="outline" colorScheme="red">
                      <TagLeftIcon as={FiPlay} />
                      <TagLabel>음악 맞히기</TagLabel>
                    </Tag>
                  ) : (
                    <Tag variant="outline" colorScheme="cyan">
                      <TagLeftIcon as={FiImage} />
                      <TagLabel>사진 맞히기</TagLabel>
                    </Tag>
                  )}
                  <Tag variant="outline" colorScheme="blue">
                    <TagLeftIcon as={RiMusic2Fill} />
                    <TagLabel>{map.numberOfQustion}</TagLabel>
                  </Tag>
                </Flex>
                <Flex gap={1}>
                  <Tooltip hasArrow label={map.isPublic ? "비공개" : "공개"} bg={map.isPublic ? "red.100" : "green.100"} color="black">
                    <Tag
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIsPublicChange(map.missionId);
                      }}
                    >
                      {map.isPublic ? <FiLock /> : <FiUnlock />}
                    </Tag>
                  </Tooltip>
                  <Tooltip hasArrow label="맵 삭제" bg="gray.300" color="black">
                    <Tag
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteMapModal(map.mapTitle, map.missionId);
                      }}
                    >
                      <FiTrash2 />
                    </Tag>
                  </Tooltip>
                </Flex>
              </HStack>
            </Box>
          </Box>
        ))}
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          border="1px solid #bbbbbb"
          cursor="pointer"
          _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }}
        >
          <Text onClick={openCreateMapModal}>맵 생성</Text>
        </Box>
      </SimpleGrid>
      <CreateMapModal isOpen={isCreateMapModalOpen} onClose={closeCreateMapModal} />
      <DeleteMapModal
        isOpen={isDeleteMapModalOpen}
        onClose={closeDeleteMapModal}
        handleMapDelete={handleMapDelete}
        confirmText={confirmText}
        selectedMapTitle={selectedMapTitle}
        setConfirmText={setConfirmText}
      />
    </Box>
  );
};

export default MapSelectPage;
