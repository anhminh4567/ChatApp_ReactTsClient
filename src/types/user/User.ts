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

export function UN_EXISTING_USER(senderId: string): User {
  return {
    Id: senderId,
    Name: "Unknown",
    Email: "Unknown@Unknown",
    IdentityId: senderId,
    AvatarUri: null,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    IsVerified: false,
    Messages: [],
    Friends: [],
    Letters: [],
  };
}
