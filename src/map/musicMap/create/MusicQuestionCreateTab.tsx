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
  Center,
  Image,
  Stack,
} from "@chakra-ui/react";
import AddSongsModal from "./AddSongsModal";
import { FaPlus, FaStar } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useSongsListStore } from "map/store/SongsListStore";
import { SongInfo } from "map/entity/SongInfo";
import { useAddSongsModalStore } from "map/store/AddSongsModalStore";
import { useMusicMapCreateStore } from "map/store/MusicMapCreateStore";
import useChakraToast from "utility/useChakraToast";

const MusicQuestionCreateTab: React.FC = () => {
  const toast = useChakraToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const { resetState } = useAddSongsModalStore();
  const { thumbnailId, setThumbnailId } = useMusicMapCreateStore();
  const { songs, removeSong } = useSongsListStore();
  const [hoveredStar, setHoveredStar] = useState<boolean[]>(Array(songs.length).fill(false));
  const [hoveredTrash, setHoveredTrash] = useState<boolean[]>(Array(songs.length).fill(false));

  const openModal = (songId: number | null = null) => {
    setSelectedSongId(songId);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    resetState();
  };

  useEffect(() => {
    if (songs.length > 0) {
      setThumbnailId(songs[0].youtubeId);
    }
  }, [songs]);

  const handleStarHover = (idx: number, isHoveredStar: boolean) => {
    const updatedHoveredStar = [...hoveredStar];
    updatedHoveredStar[idx] = isHoveredStar;
    setHoveredStar(updatedHoveredStar);
  };

  const handleTrashHover = (idx: number, isHoveredTrash: boolean) => {
    const updatedHoveredTrash = [...hoveredTrash];
    updatedHoveredTrash[idx] = isHoveredTrash;
    setHoveredTrash(updatedHoveredTrash);
  };

  const handleSetThumbnail = (youtubeId: string) => {
    setThumbnailId(youtubeId);
    toast({
      title: "썸네일 등록 완료",
      description: "선택한 곡이 썸네일로 표시됩니다.",
      status: "success",
    });
  };

  const handleRemoveCard = (songId: number) => {
    removeSong(songId);
    toast({
      title: "삭제 완료",
      description: "선택한 곡이 삭제되었습니다.",
      status: "success",
    });
  };

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
              border="1px solid #bbbbbb"
              onClick={() => openModal(song.songId)}
            >
              <Text as="b" fontSize="xl" mb={1}>
                {song.answersList.map((answer, idx) => answer.answers[0] + (idx < song.answersList.length - 1 ? " - " : ""))}
              </Text>
              <Image src={`https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`} />
              <Stack
                flexDirection={"row"}
                style={{
                  fontSize: "1.5em",
                  position: "absolute",
                  right: "0.5em",
                  bottom: "0.5em",
                }}
              >
                <FaStar
                  onMouseEnter={() => handleStarHover(idx, true)}
                  onMouseLeave={() => handleStarHover(idx, false)}
                  style={{
                    borderRadius: "10em",
                    border: "1px solid white",
                    padding: "3px",
                    color: hoveredStar[idx] || song.youtubeId === thumbnailId ? "yellow" : "white",
                    transform: hoveredStar[idx] ? "rotateY(180deg)" : "rotate(0)",
                    transition: "transform 0.3s",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetThumbnail(song.youtubeId);
                  }}
                />
                <FiTrash2
                  onMouseEnter={() => handleTrashHover(idx, true)}
                  onMouseLeave={() => handleTrashHover(idx, false)}
                  style={{
                    borderRadius: "10em",
                    border: "1px solid white",
                    padding: "3px",
                    color: hoveredTrash[idx] ? "red" : "white",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCard(song.songId);
                  }}
                />
              </Stack>
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
          <ModalHeader>문제 추가</ModalHeader>
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
