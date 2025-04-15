import { Message } from "../message/Message";
import { UserFriend } from "./UserFriend";
import { UserLetter } from "./UserLetter";

export interface User {
  Id: string;
  Name: string;
  Email: string;
  IdentityId: string;
  AvatarUri: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  IsVerified: boolean;
  Messages: Message[]; // Assuming Message is defined elsewhere
  Friends: UserFriend[]; // Assuming UserFriend is defined elsewhere
  Letters: UserLetter[]; // Assuming UserLetter is defined elsewhere
}
