export interface UserFriend {
  UserId: string; // Guid in C# maps to string in TypeScript
  FriendId: string; // string? maps to string | null
}
