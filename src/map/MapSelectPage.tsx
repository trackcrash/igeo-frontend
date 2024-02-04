import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Highlight,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MapListResponseForm } from "./entity/MusicMapInfo";
import { getMapList } from "./api/mapApi";
import { FiPlay, FiImage, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";
import { RiMusic2Fill } from "react-icons/ri";

interface DummyOptions {
  missionId: number;
  mapType: string;
  thumbnailId: string;
  mapTitle: string;
  mapDescription: string;
  numberOfQustion: number;
  isPublic: boolean;
}

const dummyItems: DummyOptions[] = [
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
  const [mapList, setMapList] = useState<MapListResponseForm[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMapTitle, setSelectedMapTitle] = useState<string>();
  const [selectedMapId, setSelectedMapId] = useState<number>();
  const openModal = (title: string, missionId: number) => {
    setSelectedMapTitle(title);
    setSelectedMapId(missionId);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setConfirmText("");
  };
  const [confirmText, setConfirmText] = useState<string>("");

  useEffect(() => {
    const fetchSongListData = async () => {
      try {
        const data = await getMapList();
        setMapList(data!);
        setIsLoading(true);
      } catch (error) {
        toast({
          title: "곡 목록 로드 실패",
          description: "곡 목록를 가져오는 중 오류가 발생했습니다.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchSongListData();
  }, [mapList]);

  const moveToSelectedMap = (missionId: number) => {
    navigate(`/music-map-register/${missionId}`);
  };

  const handleMapDelete = () => {
    console.log("맵제목", selectedMapTitle);
    console.log(selectedMapId, "번 맵 삭제");
  };

  return (
    <Box p={4}>
      <Center>
        <Text as="b" fontSize="3xl" mb={4}>
          맵 목록
        </Text>
      </Center>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {dummyItems.map((map: DummyOptions, idx: number) => (
          <Box
            key={idx}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            border="1px solid #bbbbbb"
            onClick={() => moveToSelectedMap(map.missionId)}
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
                      }}
                    >
                      {map.isPublic ? <FiLock /> : <FiUnlock />}
                    </Tag>
                  </Tooltip>
                  <Tooltip hasArrow label="맵 삭제" bg="gray.300" color="black">
                    <Tag
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(map.mapTitle, map.missionId);
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
      </SimpleGrid>
      <Modal isCentered closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>맵 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text as={"b"} fontSize="lg" mb={1}>
                삭제한 맵은 복구할 수 없습니다.
              </Text>
            </Center>
            <Center>
              <Text as={"b"} fontSize="lg" mb={3}>
                계속 진행하시려면 아래 입력창에 맵 이름을 입력해주세요
              </Text>
            </Center>
            <br />
            <Text mb={2}>
              <Highlight query={`${selectedMapTitle}`} styles={{ px: "2", py: "1", rounded: "full", bg: "red.100", fontWeight: "bold" }}>
                {selectedMapTitle!}
              </Highlight>
            </Text>
            <Input placeholder={`${selectedMapTitle}`} onChange={(e) => setConfirmText(e.target.value)} />
          </ModalBody>
          <Button colorScheme="red" onClick={handleMapDelete} isDisabled={confirmText !== selectedMapTitle}>
            삭제
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MapSelectPage;
