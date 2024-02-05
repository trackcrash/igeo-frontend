import { create } from "zustand";

interface MapBaseInfoState {
  thumbnailId: string;
  mapTitle: string;
  mapDescription: string;
  numberOfQustion: number;
  isPublic: boolean;
  setThumbnailId: (thumbnailId: string) => void;
  setMapTitle: (mapTitle: string) => void;
  setMapDescription: (mapDescription: string) => void;
  setNumberOfQustion: (numberOfQustion: number) => void;
  setIsPublic: (isPublic: boolean) => void;
}

export const useMapBaseInfoStore = create<MapBaseInfoState>((set) => ({
  thumbnailId: "",
  mapTitle: "맵 제목을 입력해주세요",
  mapDescription: "맵 설명을 입력해주세요",
  numberOfQustion: 0,
  isPublic: true,
  setThumbnailId: (thumbnailId) => set({ thumbnailId }),
  setMapTitle: (mapTitle) => set({ mapTitle }),
  setMapDescription: (mapDescription) => set({ mapDescription }),
  setNumberOfQustion: (numberOfQustion) => set({ numberOfQustion }),
  setIsPublic: (isPublic) => set({ isPublic }),
}));
