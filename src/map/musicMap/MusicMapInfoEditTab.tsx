import React from "react";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Switch,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FiPlay } from "react-icons/fi";
import { RiMusic2Fill } from "react-icons/ri";
import { useMapBaseInfoStore } from "../store/MapBaseInfoStore";

const MusicMapInfoEditTab = () => {
  const { thumbnailId, mapTitle, mapDescription, numberOfQustion, isPublic, setMapTitle, setMapDescription, setIsPublic } = useMapBaseInfoStore();

  const handleMapTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapTitle(e.target.value);
  };

  const handleMapDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapDescription(e.target.value);
  };

  return (
    <div>
      <SimpleGrid m={"0 auto"} maxW={"1000px"} columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          border="1px solid #bbbbbb"
          cursor="pointer"
          _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }}
        >
          <Image src={`https://img.youtube.com/vi/${thumbnailId}/hqdefault.jpg`} borderTopRadius="md" objectFit="cover" w="100%" h="200px" />
          <Box p={4}>
            <Center>
              <Tooltip label={`${mapTitle}`}>
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" as={"b"} fontSize={"xl"} mb={2}>
                  {mapTitle}
                </Text>
              </Tooltip>
            </Center>
            <Tooltip label={`${mapDescription}`}>
              <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontSize={"sm"} mb={4}>
                {mapDescription}
              </Text>
            </Tooltip>
            <HStack spacing={4} justifyContent={"space-between"}>
              <Flex gap={3}>
                <Tag variant="outline" colorScheme="red">
                  <TagLeftIcon as={FiPlay} />
                  <TagLabel>음악 맞히기</TagLabel>
                </Tag>
                <Tag variant="outline" colorScheme="blue">
                  <TagLeftIcon as={RiMusic2Fill} />
                  <TagLabel>map.numberOfQustion</TagLabel>
                </Tag>
              </Flex>
            </HStack>
          </Box>
        </Box>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftAddon>맵 제목</InputLeftAddon>
            <Input onChange={handleMapTitleChange} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>맵 설명</InputLeftAddon>
            <Input onChange={handleMapDescriptionChange} />
          </InputGroup>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="is-public" mb="0">
              공개 여부
            </FormLabel>
            <Switch id="is-public" />
          </FormControl>
        </Stack>
      </SimpleGrid>
    </div>
  );
};

export default MusicMapInfoEditTab;
