import { create } from "zustand";

interface MusicMapCreateState {
  thumbnailId: string;
  mapTitle: string;
  mapDescription: string;
  numberOfQustion: number;
  genre: string;
  isPublic: boolean;
  setThumbnailId: (thumbnailId: string) => void;
  setMapTitle: (mapTitle: string) => void;
  setMapDescription: (mapDescription: string) => void;
  setNumberOfQustion: (numberOfQustion: number) => void;
  setGenre: (genre: string) => void;
  setIsPublic: (isPublic: boolean) => void;
}

export const useMusicMapCreateStore = create<MusicMapCreateState>((set) => ({
  thumbnailId: "",
  mapTitle: "맵 제목을 입력해주세요",
  mapDescription: "맵 설명을 입력해주세요",
  numberOfQustion: 0,
  genre: "장르를 입력해주세요",
  isPublic: false,
  setThumbnailId: (thumbnailId) => set({ thumbnailId }),
  setMapTitle: (mapTitle) => set({ mapTitle }),
  setMapDescription: (mapDescription) => set({ mapDescription }),
  setNumberOfQustion: (numberOfQustion) => set({ numberOfQustion }),
  setGenre: (genre) => set({ genre }),
  setIsPublic: (isPublic) => set({ isPublic }),
}));
