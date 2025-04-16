// filepath: d:/FRONTEND LEARN/ReactProjects/ChatApp/src/features/chat/types/SendMessageRequest.ts

export interface SendMessageRequestDto {
  groupId: string; // UUID of the group
  "message.SenderId": string; // ID of the sender
  "message.Content": string; // Content of the message
  "message.ReferenceMessageId"?: string; // Optional UUID of the reference message
  attachments?: File[]; // Array of file attachments
}
