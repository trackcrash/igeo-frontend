import axiosInstance from "../../../utility/axiosInstance";
import { UseQueryResult, useQuery } from "react-query";
import { User } from "@/page/user/entity/User";

const userToken = localStorage.getItem("userToken");

// 회원 정보 확인
// 서버로 User 타입 전달
export const UserMyPage = async (): Promise<User | null> => {
  const response = await axiosInstance.get("/user/userProfile", {
    params: {
      userToken: userToken,
    },
  });
  return response.data;
};

// 서버에서 받아온 데이터 상태 저장
export const useUserQuery = (): UseQueryResult<User | null, unknown> => {
  return useQuery(["user"], () => UserMyPage(), { enabled: !!userToken, staleTime: Infinity });
};

// 회원 정보 등록 및 수정
// 서버로 User 타입 전달
export const updateInfo = async (updatedData: User): Promise<User> => {
  const { userToken, email, profileImg } = updatedData;

  const response = await axiosInstance.put<User>("/user/register", {
    userToken,
    email,
    profileImg,
  });
  return response.data;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string) => {
  const response = await axiosInstance.get(`/user/check-email`, {
    params: {
      email: email,
    },
  });
  return response.data;
};

// 회원 로그아웃
export const userLogout = async () => {
  const response = await axiosInstance.get(`/user/logOut`, {
    params: {
      userToken: userToken,
    },
  });
  return response.data;
};

// 회원 탈퇴
export const deleteInfo = async () => {
  const response = await axiosInstance.delete(`/user/withdrawal`, {
    params: {
      userToken: userToken,
    },
  });
  return response.data;
};
