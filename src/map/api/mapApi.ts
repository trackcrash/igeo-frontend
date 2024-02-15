import axiosInstance from "utility/axiosInstance";
import { MapInfo } from "map/entity/MapInfo";
import { SongInfo } from "map/entity/SongInfo";
import { SongRegister } from "map/entity/SongRegister";
import { MusicMapRequestForm } from "map/entity/request/MusicMapRequestForm";
import { UseQueryResult, useQuery } from "react-query";
import { useMapInfoStore } from "../store/MapInfoStore";

const userToken = localStorage.getItem("userToken")!;

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

const getMyMapList = async (): Promise<MapInfo[]> => {
  const response = await axiosInstance.get<MapInfo[]>("/api", {
    params: { userToken: userToken },
  });
  console.log("map list data: ", response.data);
  return response.data;
};

export const useMyMapListQuery = (): UseQueryResult<MapInfo[], unknown> => {
  const setMapsInfo = useMapInfoStore((state) => state.setMapInfo);
  const queryResult: UseQueryResult<MapInfo[], unknown> = useQuery("myMapList", getMyMapList, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setMapsInfo(data);
    },
  });
  return queryResult;
};
