export interface Reaction {
  Id: string; // IdGenUltils.GetIdGen(10) is handled at instantiation, not in the interface
  ReactionDescription: string;
  MimeType: string;
  Value: string;
  IsSystem: boolean; // default value is handled at instantiation, not in the interface
}
