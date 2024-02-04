import axiosInstance from "../../utility/axiosInstance";
import { SongInfo } from "../entity/SongInfo";
import { SongRegister } from "../entity/SongRegister";

const userToken = localStorage.getItem("userToken")!;

export const getMapList = async () => {};

export const getSongsList = async () => {
  const response = await axiosInstance.get<SongInfo[]>("/api/mission/list", {
    params: { userToken: userToken },
  });
  console.log("song list data: ", response.data);
  return response.data;
};

export const getSongDetail = async (songId: number) => {
  const response = await axiosInstance.get<SongInfo>(`/api/mission/detail/${songId}`);
  console.log("song detail info: ", response.data);
  return response.data;
};

export const songRegister = async (data: SongRegister): Promise<boolean> => {
  const requestData = {
    userToken: userToken,
    data: data,
  };
  const response = await axiosInstance.post<boolean>("/api/mission/save", requestData);
  console.log("check request data: ", response.data);
  return response.data;
};
