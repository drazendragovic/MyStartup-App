import { Role } from "./role";
import { User } from "./user";

export interface UserRole {
  user: User;
  role: Role;
}
