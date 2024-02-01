import axiosInstance from "../../utility/axiosInstance";
import { SongInfo } from "../entity/SongInfo";

const userToken = localStorage.getItem("userToken");

export const getSongsList = async () => {
  const response = await axiosInstance.get<SongInfo[]>("/map/music/list", {
    params: { userToken: userToken },
  });
  console.log("song list data: ", response.data);
  return response.data;
};

export const getSongDetail = async (songId: number) => {
  const response = await axiosInstance.get<SongInfo>(`/map/music/detail/${songId}`);
  console.log("song detail info: ", response.data);
  return response.data;
};
