import React, { useState } from "react";
import { Button, Center, Checkbox, CheckboxGroup, Flex, Spacer, Stack } from "@chakra-ui/react";
import CreateMapModal from "./CreateMapModal";

const MapSelectPageMenu = () => {
  const [selectedMapTypes, setSelectedMapTypes] = useState<string[]>(["music-quiz", "image-quiz"]);
  const [isCreateMapModalOpen, setCreateMapModalOpen] = useState<boolean>(false);

  const handleCheckboxChange = (value: string) => {
    setSelectedMapTypes((prev) => {
      if (prev.includes(value)) {
        return prev.length > 1 ? prev.filter((type) => type !== value) : prev;
      } else {
        return [...prev, value];
      }
    });
  };

  const openCreateMapModal = () => {
    setCreateMapModalOpen(true);
  };

  const closeCreateMapModal = () => {
    setCreateMapModalOpen(false);
  };

  return (
    <Stack>
      <Center as="b" fontSize="3xl">
        내 맵 목록
      </Center>
      <Flex mb={4}>
        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox isChecked={selectedMapTypes.includes("music-quiz")} onChange={() => handleCheckboxChange("music-quiz")}>
              음악퀴즈
            </Checkbox>
            <Checkbox isChecked={selectedMapTypes.includes("image-quiz")} onChange={() => handleCheckboxChange("image-quiz")}>
              사진퀴즈
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <Spacer />
        <Button onClick={openCreateMapModal}>맵 생성</Button>
      </Flex>
      <CreateMapModal isOpen={isCreateMapModalOpen} onClose={closeCreateMapModal} />
    </Stack>
  );
};

export default MapSelectPageMenu;
