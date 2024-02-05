import { create } from "zustand";
import { MapInfo } from "../entity/MapInfo";

interface MapInfoState {
  mapInfo: MapInfo[];
  setMapInfo: (mapInfo: MapInfo[]) => void;
}

export const useMapInfoStore = create<MapInfoState>((set) => ({
  mapInfo: [],
  setMapInfo: (mapInfo) => set({ mapInfo }),
}));
