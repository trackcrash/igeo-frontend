import axiosInstance from "../../utility/axiosInstance";
import { MapInfo } from "../entity/MapInfo";
import { SongInfo } from "../entity/SongInfo";
import { SongRegister } from "../entity/SongRegister";
import { MusicMapRequestForm } from "../entity/request/MusicMapRequestForm";

const userToken = localStorage.getItem("userToken")!;

export const getMapList = async () => {
  const response = await axiosInstance.get<MapInfo[]>("/api", {
    params: { userToken: userToken },
  });
  console.log("map list data: ", response.data);
  return response.data;
};

export const updateMapInfo = async (updatedInfo: MapInfo[]) => {
  await axiosInstance.post<MapInfo[]>("/api", {
    updatedInfo,
  });
  console.log("map update complite");
};

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

export const registerMusicMap = async (data: MusicMapRequestForm): Promise<boolean> => {
  const requestData = data;
  const response = await axiosInstance.post<boolean>("/api/mission/save", requestData);
  return response.data;
};
