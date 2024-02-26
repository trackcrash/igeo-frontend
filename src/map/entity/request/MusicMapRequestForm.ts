export type MusicMapRequestForm = {
  id: string;
  mapName: string;
  MapProducer: string;
  thumbnail: string;
  active: boolean;
  PlayNum: number;
  Description: string;
  user_id: string;
  musics: MusicInfo[];
};

export type MusicInfo = {
  id: number;
  title: string;
  song: string;
  youtube_url: string;
  answer: string;
  hint: string;
  startTime: string | null;
  endTime: string | null;
  category: string;
};
