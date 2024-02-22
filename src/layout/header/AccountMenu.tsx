import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Box, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FaUserCircle, FaList } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

interface AccountMenuProps {
  handleLogout: () => void;
}

export default function AccountMenu({ handleLogout }: AccountMenuProps) {
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/myPage");
  };

  const moveToMyQuiz = () => {
    navigate("/map/my-map");
  };

  const userProfileImg = localStorage.getItem("encodedProfileImg");
  //   const userNickName = localStorage.getItem("encodedNickName");
  const userNickName = "노예";
  const userLevel = 1;

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton bg={"gray.700"} borderRadius={"0.25em"} border={"solid 0.1px"} minW={"180px"}>
          <Flex as={"header"} align={"center"} justify={"center"} p={"4"} cursor={"pointer"}>
            <Flex align={"center"}>
              <Avatar size={"md"} name={userNickName} src="img/chino.jpg" />
              <Box m={"0 10px"}>
                <Text fontWeight={"bold"}>{userNickName}</Text>
                <Badge colorScheme={"green"}>Lv. {userLevel}</Badge>
              </Box>
              <MdArrowDropDown fontSize={"30px"} />
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FaUserCircle fontSize={"15px"} />} onClick={moveToMyPage}>
            마이페이지
          </MenuItem>
          <MenuItem icon={<FaList fontSize={"15px"} />} onClick={moveToMyQuiz}>
            내 퀴즈 목록
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<FiLogOut fontSize={"15px"} />} onClick={handleLogout}>
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
