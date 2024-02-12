import { create } from "zustand";
import { SongInfo } from "../entity/SongInfo";

interface SongsListState {
  songs: SongInfo[];
  addSong: (song: Omit<SongInfo, "songId">) => void;
  updateSong: (songId: number, song: Omit<SongInfo, "songId">) => void;
  removeSong: (songId: number) => void;
  removeAllSongs: () => void;
}

export const useSongsListStore = create<SongsListState>((set) => ({
  songs: [],
  addSong: (song) =>
    set((prev) => ({
      songs: [...prev.songs, { ...song, songId: prev.songs.length + 1 }],
    })),
  updateSong: (songId, updatedSong) =>
    set((prev) => ({
      songs: prev.songs.map((song) => (song.songId === songId ? { ...song, ...updatedSong } : song)),
    })),
  removeSong: (songId) =>
    set((prev) => ({
      songs: prev.songs.filter((song) => song.songId !== songId),
    })),
  removeAllSongs: () =>
    set(() => ({
      songs: [],
    })),
}));
