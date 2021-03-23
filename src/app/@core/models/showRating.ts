import { Show } from "./show";
import { User } from "./user";

export interface ShowRating {
  showRatingId?: number;
  showId?: number;
  show?: Show;
  user?: User;
  rating?: number;
}
