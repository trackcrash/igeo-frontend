import { Box, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 회원 탈퇴 완료 페이지
const WithdrawalComplete = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("userToken");
    }, 5000);
    if (localStorage.getItem("userToken") === "") {
      // toast.error("로그인을 해주세요.");
      navigate("/login");
    }
    return () => clearTimeout(timer);
  }, [localStorage]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="exit-style">지금까지 igeo.site를 이용해주셔서 감사합니다.</div>
      <Button variant="outlined" onClick={goHome}>
        홈으로
      </Button>
    </Box>
  );
};

export default WithdrawalComplete;
