import { UserLetterType } from "./UserLetterType";

export interface UserLetter {
  Id: string; // Guid in C# maps to string in TypeScript
  SenderId: string | null; // string? maps to string | null
  ReceiverId: string;
  LetterType: UserLetterType; // Assuming UserLetterType is an enum or type alias
  Content: string;
  SentAt: Date;
  ProcessedAt: Date | null;
  IsHtml: boolean;
  ExpireTime: Date;
  IsRead: boolean;
}
