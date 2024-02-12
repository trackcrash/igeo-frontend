export type SongRegister = {
  songId: number;
  youtubeId: string;
  startTime: string;
  endTime: string;
  genre: string;
  answers: AnswerList[];
};

interface AnswerList {
  answers: string[];
}
