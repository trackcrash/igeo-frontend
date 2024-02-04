import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  useToast,
  Center,
  Image,
} from "@chakra-ui/react";
import AddSongsModal from "./AddSongsModal";
import { FaPlus } from "react-icons/fa";
import { getSongsList } from "../api/mapApi";
import { SongListResponseForm } from "../entity/SongList";
import "../css/MusicMapRegisterPage.css";

interface DummyOptions {
  songId: number;
  videoId: string;
  songTitle: string;
  artistName: string;
}

const dummyItems: DummyOptions[] = [
  {
    songId: 1,
    videoId: "AjspnMNkGu8",
    songTitle: "梅に鶯",
    artistName: "r-906",
  },
  {
    songId: 2,
    videoId: "PxF9hCmaBy4",
    songTitle: "禁略フォビドゥン",
    artistName: "ナナホシ管弦楽団",
  },
];

const MusicMapRegisterPage: React.FC = () => {
  const toast = useToast();
  const [songList, setSongList] = useState<SongListResponseForm[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const openModal = (songId: number | null = null) => {
    setSelectedSongId(songId);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchSongListData = async () => {
      try {
        const data = await getSongsList();
        setSongList(data);
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
  }, []);

  return (
    <div>
      {dummyItems && dummyItems.length > 0 && (
        <SimpleGrid spacing={4} m={"0 20px"} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {dummyItems.map((song: DummyOptions, idx: number) => (
            <Card cursor={"pointer"} key={idx} p={"8px 0"} onClick={() => openModal(song.songId)}>
              <Text as="b" fontSize="xl">
                {song.songTitle}
              </Text>
              <Image src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`} />
            </Card>
          ))}
          <Card cursor={"pointer"} onClick={() => openModal(null)}>
            <CardBody display={"flex"} justifyContent={"center"}>
              <Center flexDirection={"column"}>
                <FaPlus />
                <Text>문제 추가</Text>
              </Center>
            </CardBody>
          </Card>
        </SimpleGrid>
      )}
      {/* {isLoading ? (
        loadedItems &&
        loadedItems.length > 0 && (
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {cardsOptions.map((card: SongCardOptions, idx: number) => (
              <Card cursor={"pointer"} key={idx} p={"8px 0"} onClick={() => openModal(song.songId)}>
                <Text as="b" fontSize="xl">
                  {song.songTitle}
                </Text>
                <Image src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`} />
              </Card>
            ))}
            <Card cursor={"pointer"} onClick={() => openModal(null)}>
              <CardBody display={"flex"} justifyContent={"center"}>
                <Center flexDirection={"column"}>
                  <FaPlus />
                  <Text>문제 추가</Text>
                </Center>
              </CardBody>
            </Card>
          </SimpleGrid>
        )
      ) : (
        <p>곡 정보 불러오는 중</p>
      )} */}

      <Modal id="addsongmodal" isCentered closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>곡 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddSongsModal selectedSongId={selectedSongId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MusicMapRegisterPage;
