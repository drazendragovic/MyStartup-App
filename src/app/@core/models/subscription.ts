import { Genre } from "./genre";
import { Show } from "./show";
import { TvStation } from "./tvStation";
import { User } from "./user";

export interface Subscription {
  subscriptionId?: number;
  status?: number;
  show?: Show;
  showId?: number;
  userId?: string;
  user?: User;
  name?: string;
  tvStationId?: number;
  tvStation?: TvStation;
  genre?: Genre;
  firstName?: string;
  surname?: string;
}
