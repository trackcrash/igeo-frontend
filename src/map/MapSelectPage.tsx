import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMyMapListQuery } from "map/api/mapApi";
import { FiPlay, FiImage, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";
import { RiMusic2Fill } from "react-icons/ri";
import { useMapInfoStore } from "map/store/MapInfoStore";
import DeleteMapModal from "./DeleteMapModal";
import { MapInfo } from "./entity/MapInfo";
import MapSelectPageMenu from "./MapSelectPageMenu";

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
  const navigate = useNavigate();
  const { mapInfo, setMapInfo } = useMapInfoStore();
  const [selectedMapTitle, setSelectedMapTitle] = useState<string>();
  const [selectedMapId, setSelectedMapId] = useState<number>();
  const [confirmText, setConfirmText] = useState<string>("");
  const [isDeleteMapModalOpen, setIsDeleteMapModalOpen] = useState<boolean>(false);
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

  useEffect(() => {
    setMapInfo(dummyItems);
  }, [dummyItems]);

  const moveToSelectedMap = (type: string, missionId: number) => {
    navigate(`/map/edit/${type.toLowerCase()}/${missionId}`);
  };

  const handleIsPublicChange = async (missionId: number) => {
    const updatedMapInfo = mapInfo.map((map) => (map.missionId === missionId ? { ...map, isPublic: !map.isPublic } : map));
    setMapInfo(updatedMapInfo);
    // await updateMapInfo(mapInfo);
  };

  const handleMapDelete = () => {
    console.log("맵제목", selectedMapTitle);
    console.log(selectedMapId, "번 맵 삭제");
  };

  return (
    <Box p={4}>
      <MapSelectPageMenu />
      {isError ? (
        <Center m={"10em 0"}>맵 정보를 불러오는 중 오류가 발생했습니다.</Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {isLoading ? (
            <>
              {Array(6)
                .fill(null)
                .map((_: any, idx: number) => (
                  <Box key={idx} borderRadius="lg" boxShadow="md">
                    <Skeleton borderTopRadius="md" w="100%" h="200px" />
                    <Box p={4}>
                      <SkeletonText mb={4} />
                      <HStack spacing={4} justifyContent={"space-between"}>
                        <Flex gap={3}>
                          <SkeletonCircle />
                          <SkeletonCircle />
                        </Flex>
                        <Flex gap={1}>
                          <SkeletonCircle />
                          <SkeletonCircle />
                        </Flex>
                      </HStack>
                    </Box>
                  </Box>
                ))}
            </>
          ) : (
            <>
              {mapList?.map((map: MapInfo, idx: number) => (
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
            </>
          )}
        </SimpleGrid>
      )}
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
