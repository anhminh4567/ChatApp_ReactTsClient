export interface MessageReaction {
  MesssageId: string; // Guid maps to string
  ReactionId: string;
  Count: number; // Count is a getter in C#, so it's a regular property in the interface
  ReactorIds: string[];
}
