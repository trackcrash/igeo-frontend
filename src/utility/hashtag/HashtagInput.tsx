import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";

interface HashTagInputProps {
  existingAnswers: string[];
  onAddAnswer: (tag: string) => void;
  onRemoveAnswer: (tag: string) => void;
  onRemoveAllAnswers: () => void;
}

const HashtagInput: React.FC<HashTagInputProps> = ({ existingAnswers, onAddAnswer, onRemoveAnswer, onRemoveAllAnswers }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTag = inputValue.trim();
      if (!existingAnswers.includes(newTag)) {
        onAddAnswer(newTag);
      }
      setInputValue("");
    }
  };

  return (
    <InputGroup size="md">
      <Input mb={2} pr="4.5rem" placeholder="정답을 추가해주세요" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" m={"0 4px"} onClick={onRemoveAllAnswers}>
          전체 삭제
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default HashtagInput;
