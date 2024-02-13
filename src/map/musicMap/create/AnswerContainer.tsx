import React, { useEffect, useState } from "react";
import { Flex, Input, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, ButtonGroup } from "@chakra-ui/react";
import HashtagInput from "utility/hashtag/HashtagInput";
import HashTagList from "utility/hashtag/HashtagList";
import { useAddSongsModalStore } from "map/store/AddSongsModalStore";
import { SelectedSongIdProps } from "./AddSongsModal";
import { useSongsListStore } from "map/store/SongsListStore";

const AnswerTagContainer: React.FC<SelectedSongIdProps> = ({ selectedSongId }) => {
  const { categories, setCategories, answersList, setAnswersList } = useAddSongsModalStore();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    if (selectedSongId !== null) {
      const song = useSongsListStore.getState().songs.find((s) => s.songId === selectedSongId);
      if (song) {
        setCategories(song.categories || [""]);
        setAnswersList(song.answersList || [{ answers: [] }]);
        setSelectedTab(0);
      }
    }
  }, [selectedSongId]);

  const handleCategoryChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newCategories = [...categories];
    newCategories[index] = e.target.value;
    setCategories(newCategories);
  };

  const handleAddForm = () => {
    const lastCategory = categories[categories.length - 1];
    if (lastCategory.trim() !== "") {
      setCategories([...categories, ""]);
      setAnswersList([...answersList, { answers: [] }]);
      setSelectedTab(categories.length);
    }
  };

  const handleRemoveForm = (index: number) => {
    const newCategories = [...categories];
    const newAnswersList = [...answersList];
    newCategories.splice(index, 1);
    newAnswersList.splice(index, 1);
    setCategories(newCategories);
    setAnswersList(newAnswersList);
    setSelectedTab(Math.min(index, categories.length - 2));
  };

  const handleAddAnswer = (index: number, answer: string) => {
    const newAnswersList = [...answersList];
    newAnswersList[index].answers = [...newAnswersList[index].answers, answer];
    setAnswersList(newAnswersList);
  };

  const handleRemoveAnswer = (index: number, answer: string) => {
    const newAnswersList = [...answersList];
    newAnswersList[index].answers = newAnswersList[index].answers.filter((a) => a !== answer);
    setAnswersList(newAnswersList);
  };

  const handleRemoveAllAnswers = (index: number) => {
    const newAnswersList = [...answersList];
    newAnswersList[index].answers = [];
    setAnswersList(newAnswersList);
  };

  return (
    <Flex direction="column" p={4} backgroundColor={"#404c60"}>
      <Tabs isFitted variant="soft-rounded" colorScheme="green" index={selectedTab} onChange={(index) => setSelectedTab(index)}>
        <TabList>
          {categories.map((_, index: number) => (
            <Tab key={index}>문제 {index + 1}번</Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category: string, index: number) => (
            <TabPanel key={index}>
              <Flex direction="column">
                <Text as="b" align="start" pl={2} mb={2}>
                  정답 추가 {index + 1}
                </Text>
                <Flex mb={2} gap={4}>
                  <Input flex={1} placeholder="문제를 입력해주세요" value={category} onChange={(e) => handleCategoryChange(index, e)} />
                  <Flex flex={2}>
                    <HashtagInput
                      existingAnswers={answersList[index].answers}
                      onAddAnswer={(answer) => handleAddAnswer(index, answer)}
                      onRemoveAnswer={(answer) => handleRemoveAnswer(index, answer)}
                      onRemoveAllAnswers={() => handleRemoveAllAnswers(index)}
                    />
                  </Flex>
                </Flex>
                <HashTagList answers={answersList[index].answers} onRemoveAnswer={(answer) => handleRemoveAnswer(index, answer)} />
                <ButtonGroup justifyContent="center" mt={2}>
                  <Button onClick={handleAddForm}>문제 추가</Button>
                  {categories.length > 1 && <Button onClick={() => handleRemoveForm(index)}>문제 삭제</Button>}
                </ButtonGroup>
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AnswerTagContainer;
