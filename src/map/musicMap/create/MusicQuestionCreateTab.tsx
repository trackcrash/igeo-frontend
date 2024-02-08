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
  Center,
  Image,
} from "@chakra-ui/react";
import AddSongsModal from "./AddSongsModal";
import { FaPlus } from "react-icons/fa";
import { useSongsListStore } from "../../store/SongsListStore";
import { SongInfo } from "../../entity/SongInfo";

const MusicQuestionCreateTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const openModal = (songId: number | null = null) => {
    setSelectedSongId(songId);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const { songs } = useSongsListStore();

  return (
    <div>
      <SimpleGrid spacing={4} m={"0 20px"} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {songs.length > 0 &&
          songs.map((song: SongInfo, idx: number) => (
            <Card
              cursor={"pointer"}
              _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }}
              key={idx}
              p={"8px 0"}
              onClick={() => openModal(song.songId)}
            >
              <Text as="b" fontSize="xl">
                {song.songTitle}
              </Text>
              <Image src={`https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`} />
            </Card>
          ))}
        <Card cursor={"pointer"} _hover={{ transform: "scale(1.02)", transition: "transform 0.3s" }} onClick={() => openModal(null)}>
          <CardBody display={"flex"} justifyContent={"center"}>
            <Center flexDirection={"column"}>
              <FaPlus />
              <Text>문제 추가</Text>
            </Center>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Modal id="addsongmodal" isCentered closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>곡 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddSongsModal selectedSongId={selectedSongId} onModalClose={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MusicQuestionCreateTab;
