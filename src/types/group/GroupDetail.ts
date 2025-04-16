import { User } from "../user/User";
import { Group } from "./Group";

export type GroupDetail = {
  Group: Group;
  ParticipantsDetail: User[];
};
