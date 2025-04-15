export interface GroupRole {
  Role: string; // string? maps to string | null
  Description: string; // string? maps to string | null
  IsDefault: boolean; // Default value handled at instantiation, not in the interface
  IsSystem: boolean; // Default value handled at instantiation, not in the interface
}
