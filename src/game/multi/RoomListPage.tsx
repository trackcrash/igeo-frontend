import React from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { FiImage, FiLock, FiPlay } from "react-icons/fi";
import { RiMusic2Fill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";
import { RoomInfo } from "game/entity/RoomInfo";

type RoomListProps = {
  roomList: RoomInfo[];
  isError: boolean;
  isLoading: boolean;
};

const RoomListPage: React.FC<RoomListProps> = ({ roomList, isError, isLoading }) => {
  const handleJoinRoom = () => {};

  return (
    <Box>
      {/* {isError ? (
        <Center m={"10em 0"}>방 목록을 불러오는 중 오류가 발생했습니다.</Center>
      ) : ( */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {/* {isLoading ? (
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
            <> */}
        {roomList?.map((room: RoomInfo, idx: number) => (
          <Box
            key={idx}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            border="1px solid #bbbbbb"
            onClick={handleJoinRoom}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }}
          >
            <Image
              src={`https://img.youtube.com/vi/${room.thumbnailId}/hqdefault.jpg`}
              alt={`${room.thumbnailId}`}
              borderTopRadius="md"
              objectFit="cover"
              w="100%"
              h="200px"
            />
            <Box p={4}>
              <HStack spacing={4} justifyContent={"space-between"}>
                <Flex>
                  <Tag>
                    <TagLeftIcon color={"yellow.300"} as={FaCrown} />
                    <TagLabel>{`${room.roomMaster}`}</TagLabel>
                  </Tag>
                </Flex>
                {!room.isPublic && (
                  <Flex gap={1}>
                    <Tag>
                      <FiLock />
                    </Tag>
                  </Flex>
                )}
              </HStack>
              <Center>
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" as={"b"} fontSize={"xl"} mb={2}>
                  {room.roomName}
                </Text>
              </Center>
              <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontSize={"sm"} mb={4}>
                {`맵 이름 : ${room.mapTitle}`}
              </Text>
              <HStack spacing={4} justifyContent={"space-between"}>
                <Flex gap={3}>
                  {room.mapType === "MUSIC" ? (
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
                    <TagLabel>{room.numberOfQustion}</TagLabel>
                  </Tag>
                </Flex>
                <Flex gap={1}>
                  {room.isPlaying === "PLAYING" ? (
                    <Tag bg="red.700">
                      <TagLabel>진행중</TagLabel>
                    </Tag>
                  ) : (
                    <Tag bg="green.400">
                      <TagLabel>대기중</TagLabel>
                    </Tag>
                  )}
                  <Tag>{`${room.playerNum} / 8`}</Tag>
                </Flex>
              </HStack>
            </Box>
          </Box>
        ))}
        {/* </>
          )} */}
      </SimpleGrid>
      {/* )} */}
    </Box>
  );
};

export default RoomListPage;
