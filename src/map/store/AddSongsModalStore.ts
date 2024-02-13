import { create } from "zustand";

interface AnswerList {
  answers: string[];
}

interface AddSongsModalState {
  youtubeId: string;
  startTime: string;
  endTime: string;
  songTitle: string;
  artistName: string;
  categories: string[];
  answersList: AnswerList[];
  hint: string;
  setYoutubeId: (youtubeId: string) => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setSongTitle: (songTitle: string) => void;
  setArtistName: (artistName: string) => void;
  setCategories: (categories: string[]) => void;
  setAnswersList: (answersList: AnswerList[]) => void;
  setHint: (hint: string) => void;
  removeAnswerList: (index: number) => void;
  removeAllAnswersList: () => void;
  resetState: () => void;
}

export const useAddSongsModalStore = create<AddSongsModalState>((set) => ({
  youtubeId: "",
  startTime: "00:00:00",
  endTime: "00:00:00",
  songTitle: "",
  artistName: "",
  categories: [""],
  answersList: [{ answers: [] }],
  hint: "",
  setYoutubeId: (youtubeId) => set({ youtubeId }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setSongTitle: (songTitle) => set({ songTitle }),
  setArtistName: (artistName) => set({ artistName }),
  setCategories: (categories) => set({ categories }),
  setAnswersList: (answersList) => set({ answersList }),
  setHint: (hint) => set({ hint }),
  removeAnswerList: (index) =>
    set((state) => {
      const newAnswersList = [...state.answersList];
      newAnswersList.splice(index, 1);
      return { answersList: newAnswersList };
    }),
  removeAllAnswersList: () => set({ answersList: [] }),
  resetState: () =>
    set({
      youtubeId: "",
      startTime: "00:00:00",
      endTime: "00:00:00",
      songTitle: "",
      artistName: "",
      categories: [""],
      answersList: [{ answers: [] }],
    }),
}));
