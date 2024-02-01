import { create } from "zustand";

interface AddSongsModalState {
  youtubeId: string;
  startTime: string;
  endTime: string;
  songTitle: string;
  artistName: string;
  genre: string;
  answers: string[];
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
    youtubeId: string;
    startTime: string;
    endTime: string;
    songTitle: string;
    artistName: string;
    genre: string;
    answers: string[];
  }>;
  setSongsInfo: (songsInfo: {
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
  youtubeId: "",
  startTime: "00:00:00",
  endTime: "00:00:00",
  songTitle: "",
  artistName: "",
  genre: "",
  answers: [],
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
  setSongsInfo: (songInfo) =>
    set((prev) => ({
      songsInfo: [...prev.songsInfo, songInfo],
    })),
}));
