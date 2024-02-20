export type CreateRoom = {
  type: string;
  roomName: string;
  sender: string;
  password: string;
  maxUser: number;
};
