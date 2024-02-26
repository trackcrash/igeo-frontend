import React, { useEffect } from "react";
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
import { useMusicMapCreateStore } from "map/store/MusicMapCreateStore";
import { useSongsListStore } from "map/store/SongsListStore";

const MusicMapInfoCreateTab: React.FC = () => {
  const { thumbnail, mapName, description, genre, isPublic, setmapName, setdescription, setnumberOfQuestion, setGenre, setIsPublic } =
    useMusicMapCreateStore();
  const { songs } = useSongsListStore();

  useEffect(() => {
    setnumberOfQuestion(songs.length);
  }, [songs]);

  const handlemapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmapName(e.target.value);
  };

  const handledescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdescription(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(e.target.value);
  };

  const handleIsPublicChange = () => {
    setIsPublic(!isPublic);
  };

  return (
    <SimpleGrid m={"0 auto"} maxW={"1000px"} columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
      <Box borderRadius="lg" overflow="hidden" boxShadow="md" border="1px solid #bbbbbb">
        <Image src={`https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`} borderTopRadius="md" objectFit="cover" w="100%" h="200px" />
        <Box p={4}>
          <Center>
            <Tooltip label={`${mapName}`}>
              <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" as={"b"} fontSize={"xl"} mb={2}>
                {mapName}
              </Text>
            </Tooltip>
          </Center>
          <Tooltip label={`${description}`}>
            <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontSize={"sm"} mb={4}>
              {description}
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
                <TagLabel>{songs.length}</TagLabel>
              </Tag>
            </Flex>
            <Tag variant="outline" colorScheme="orange">
              <TagLabel>{genre}</TagLabel>
            </Tag>
          </HStack>
        </Box>
      </Box>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon minWidth={"85px"}>맵 제목</InputLeftAddon>
          <Input onChange={handlemapNameChange} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon minWidth={"85px"}>맵 설명</InputLeftAddon>
          <Input onChange={handledescriptionChange} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon minWidth={"85px"}>장르</InputLeftAddon>
          <Input onChange={handleGenreChange} />
        </InputGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="is-public" mb="0">
            공개 여부
          </FormLabel>
          <Switch id="is-public" onChange={handleIsPublicChange} />
        </FormControl>
      </Stack>
    </SimpleGrid>
  );
};

export default MusicMapInfoCreateTab;
