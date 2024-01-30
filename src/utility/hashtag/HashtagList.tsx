import React from "react";
import { Tag, TagLabel, TagCloseButton, Wrap } from "@chakra-ui/react";

interface HashTagListProps {
  answers: string[];
  onRemoveAnswer: (answer: string) => void;
}

const HashTagList: React.FC<HashTagListProps> = ({ answers, onRemoveAnswer }) => {
  return (
    <Wrap mb={2}>
      {answers.map((answer, index) => (
        <Tag size="md" key={index} variant="outline" colorScheme="green">
          <TagLabel>{answer}</TagLabel>
          <TagCloseButton onClick={() => onRemoveAnswer(answer)} />
        </Tag>
      ))}
    </Wrap>
  );
};

export default HashTagList;
