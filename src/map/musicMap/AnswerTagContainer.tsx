import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import HashtagInput from "../../utility/hashtag/HashtagInput";
import HashTagList from "../../utility/hashtag/HashtagList";
import { useAddSongsModalStore } from "../store/AddSongsModalStore";

const AnswerTagContainer = () => {
  const { answers, setAnswers, removeAnswer, removeAllAnswers } = useAddSongsModalStore();
  const handleAddAnswer = (answer: string) => {
    setAnswers([answer]);
  };

  const handleRemoveAnswer = (answer: string) => {
    removeAnswer(answer);
  };

  const handleRemoveAllAnswers = () => {
    removeAllAnswers();
  };

  return (
    <Flex direction={"column"}>
      <Text as="b" align={"start"} pl={"10px"} mb={"8px 0"}>
        정답 추가
      </Text>
      <HashtagInput
        existingAnswers={answers}
        onAddAnswer={handleAddAnswer}
        onRemoveAnswer={handleRemoveAnswer}
        onRemoveAllAnswers={handleRemoveAllAnswers}
      />
      <HashTagList answers={answers} onRemoveAnswer={handleRemoveAnswer} />
    </Flex>
  );
};

export default AnswerTagContainer;
