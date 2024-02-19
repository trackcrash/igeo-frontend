import axiosInstance from "utility/axiosInstance";
import { UseQueryResult, useQuery } from "react-query";
import { RoomInfo } from "game/entity/RoomInfo";

const getRoomList = async (): Promise<RoomInfo[]> => {
  const response = await axiosInstance.get<RoomInfo[]>("/api");
  console.log("room list data: ", response.data);
  return response.data;
};

export const useRoomListQuery = (): UseQueryResult<RoomInfo[], unknown> => {
  const queryResult: UseQueryResult<RoomInfo[], unknown> = useQuery("roomList", getRoomList, {
    refetchOnWindowFocus: false,
  });
  return queryResult;
};
