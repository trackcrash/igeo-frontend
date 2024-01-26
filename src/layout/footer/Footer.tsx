import React from "react";
import Donate from "./donate/Donate";
import { FaDiscord } from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";
import { Center, Flex } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Flex direction="column">
      <Center>
        <MdSmartphone />
        &nbsp;duf7317@naver.com
      </Center>
      <Center>
        <FaDiscord />
        &nbsp;Eiveryan#3082
      </Center>
      <Center>© 2023 igeo.site</Center>
      <Donate />
    </Flex>
  );
};

export default Footer;
