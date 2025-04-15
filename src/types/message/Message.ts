import { MessageReaction } from "./MessageReaction";
import { MessageAttachment } from "./MessageAttachment";
export interface Message {
  Id: string; // Guid maps to string
  SenderId: string;
  GroupId: string; // Guid maps to string
  Content: string; // Default value is handled at instantiation, not in the interface
  ReferenceId: string | null; // Guid? maps to string | null
  RefrenceMessage: Message | null; // Assuming Message is defined elsewhere
  MessageReactions: MessageReaction[]; // Assuming MessageReaction is defined elsewhere
  MessageAttachments: MessageAttachment[]; // Assuming MessageAttachment is defined elsewhere
  CreatedAt: Date;
  DeletedAt: Date | null;
}
