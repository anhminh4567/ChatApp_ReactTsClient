import { Message } from "../message/Message";
import { MediaObject } from "../shared/MediaObject";
import { User } from "../user/User";
import { GroupType } from "./GroupType";
import { Participant } from "./Participant";

export interface Group {
  Id: string; // Guid maps to string
  Name: string;
  CreatorId: string;
  Creator: User | null; // Assuming User is defined elsewhere
  CreatedAt: Date;
  DeleteAt: Date | null;
  GroupType: GroupType; // Assuming GroupType is defined elsewhere
  ThumbDetail: MediaObject | null; // Assuming MediaObject is defined elsewhere
  Messages: Message[]; // Assuming Message is defined elsewhere
  Participants: Participant[]; // Assuming Participant is defined elsewhere
}
