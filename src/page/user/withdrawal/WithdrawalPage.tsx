import React, { useEffect, useState } from "react";
import { deleteInfo } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../layout/header/AuthConText";
import { AxiosError } from "axios";
import { Box, Button, Container, Input } from "@chakra-ui/react";

import "./css/Withdrawal.css";

// 회원 탈퇴 페이지
const WithdrawalPage = () => {
  const [confirmText, setConfirmText] = useState("");
  const { setIsLoggedIn } = useAuth();
  const { checkAuthorization } = useAuth();
  const isUser = checkAuthorization();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isDelete = await deleteInfo();
      if (isDelete) {
        // toast.success("회원 탈퇴가 완료되었습니다.");
        setIsLoggedIn(false);
        navigate("/exit");
      }
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        // toast.error("페이지를 찾을 수 없습니다.");
      } else {
        // toast.error("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  // useEffect(() => {
  //   if (!isUser) {
  //     // toast.error("로그인을 해주세요.");
  //     navigate("/login");
  //   }
  // }, [isUser, navigate]);

  const isConfirmTextValid = confirmText === "회원 탈퇴";

  return (
    <Container sx={{ marginTop: "1em", width: "500px", maxWidth: "500px" }}>
      <Box display="flex" flexDirection="column" gap={1} p={2}>
        <div className="withdrawal-container">회원 탈퇴</div>
        <h3>
          계속 진행하시려면
          <br />
          아래 입력창에 "<span className="italic-font">회원 탈퇴 </span>"를 입력해주세요
        </h3>
        <form onSubmit={handleSubmit}>
          <p>회원 탈퇴 확인</p>
          <Input
            type="text"
            id="confirmText"
            variant="outlined"
            placeholder="회원 탈퇴"
            sx={{ marginBottom: "16px" }}
            value={confirmText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmText(e.target.value)}
            required
          />
          <div className="align-right">
            <Button variant="outlined" type="submit" disabled={!isConfirmTextValid}>
              탈퇴하기
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default WithdrawalPage;
