import { create } from "zustand";

interface AddSongsModalState {
  originalLink: string;
  youtubeId: string;
  startTime: string;
  endTime: string;
  songTitle: string;
  artistName: string;
  genre: string;
  answers: string[];
  setOriginalLink: (originalLink: string) => void;
  setYoutubeId: (youtubeLink: string) => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setSongTitle: (songTitle: string) => void;
  setArtistName: (artistName: string) => void;
  setGenre: (genre: string) => void;
  setAnswers: (answers: string[]) => void;
  removeAnswer: (answerToRemove: string) => void;
  removeAllAnswers: () => void;
  resetState: () => void;

  songsInfo: Array<{
    originalLink: string;
    youtubeId: string;
    startTime: string;
    endTime: string;
    songTitle: string;
    artistName: string;
    genre: string;
    answers: string[];
  }>;
  setSongsInfo: (songsInfo: {
    originalLink: string;
    youtubeId: string;
    startTime: string;
    endTime: string;
    songTitle: string;
    artistName: string;
    genre: string;
    answers: string[];
  }) => void;
}

export const useAddSongsModalStore = create<AddSongsModalState>((set) => ({
  originalLink: "",
  youtubeId: "",
  startTime: "00:00:00",
  endTime: "00:00:00",
  songTitle: "",
  artistName: "",
  genre: "",
  answers: [],
  setOriginalLink: (originalLink) => set({ originalLink }),
  setYoutubeId: (youtubeId) => set({ youtubeId }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setSongTitle: (songTitle) => set({ songTitle }),
  setArtistName: (artistName) => set({ artistName }),
  setGenre: (genre) => set({ genre }),
  setAnswers: (answers: string[]) =>
    set((prev) => ({
      answers: [...prev.answers, ...answers],
    })),
  removeAnswer: (answerToRemove: string) =>
    set((prev) => ({
      answers: prev.answers.filter((answer) => answer !== answerToRemove),
    })),
  removeAllAnswers: () =>
    set(() => ({
      answers: [],
    })),
  resetState: () =>
    set({
      originalLink: "",
      youtubeId: "",
      startTime: "00:00:00",
      endTime: "00:00:00",
      songTitle: "",
      artistName: "",
      genre: "",
      answers: [],
      songsInfo: [],
    }),

  songsInfo: [],
  setSongsInfo: (songsInfo) =>
    set((prev) => ({
      songsInfo: [...prev.songsInfo, songsInfo],
    })),
}));
