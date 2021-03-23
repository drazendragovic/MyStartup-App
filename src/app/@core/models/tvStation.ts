import { Show } from "./show";
import { User } from "./user";

export interface TvStation {
  tvStationId?: number;
  name?: string;
  logoUrl?: string;
  user?: User;
  userId?: string;
  shows?: Show[];
  showsTotal?: number;
}
