import { MapInfo } from "map/entity/MapInfo";

export type RoomInfo = Omit<MapInfo, "missionId" | "description"> & {
  roomName: string;
  roomMaster: string;
  isPlaying: string;
  playerNum: number;
};
