export interface Participant {
  UserId: string;
  GroupId: string; // Guid maps to string
  RoleName: string;
  IsMuted: boolean; // Default value handled at instantiation, not in the interface
  JoinedAt: Date;
}
