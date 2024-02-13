export type SongInfo = {
  songId: number;
  youtubeId: string;
  startTime: string;
  endTime: string;
  songTitle: string;
  artistName: string;
  hint: string;
  categories: string[];
  answersList: AnswerList[];
};

interface AnswerList {
  answers: string[];
}
