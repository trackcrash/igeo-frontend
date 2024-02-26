import { create } from "zustand";

interface MusicMapCreateState {
  thumbnail: string;
  mapName: string;
  description: string;
  numberOfQuestion: number;
  genre: string;
  isPublic: boolean;
  setthumbnail: (thumbnail: string) => void;
  setmapName: (mapName: string) => void;
  setdescription: (description: string) => void;
  setnumberOfQuestion: (numberOfQuestion: number) => void;
  setGenre: (genre: string) => void;
  setIsPublic: (isPublic: boolean) => void;
}

export const useMusicMapCreateStore = create<MusicMapCreateState>((set) => ({
  thumbnail: "",
  mapName: "맵 제목을 입력해주세요",
  description: "맵 설명을 입력해주세요",
  numberOfQuestion: 0,
  genre: "장르를 입력해주세요",
  isPublic: false,
  setthumbnail: (thumbnail) => set({ thumbnail }),
  setmapName: (mapName) => set({ mapName }),
  setdescription: (description) => set({ description }),
  setnumberOfQuestion: (numberOfQuestion) => set({ numberOfQuestion }),
  setGenre: (genre) => set({ genre }),
  setIsPublic: (isPublic) => set({ isPublic }),
}));
