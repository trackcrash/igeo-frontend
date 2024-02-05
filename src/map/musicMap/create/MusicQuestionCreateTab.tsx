import React, { useState } from "react";
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
import AddSongsModal from "../AddSongsModal";
import { FaPlus } from "react-icons/fa";
import { SongListResponseForm } from "../../entity/SongList";

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

const MusicQuestionCreateTab: React.FC = () => {
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

export default MusicQuestionCreateTab;
