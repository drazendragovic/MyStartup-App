import { Time } from "@angular/common";
import { Genre } from "./genre";
import { ShowRating } from "./showRating";
import { Subscription } from "./subscription";
import { TvStation } from "./tvStation";

export interface Show {
  showId?: number;
  name?: string;
  description?: string;
  startTime?: Date;
  duration?: Time;
  coverPicture?: string;
  trailer?: string;
  maturityRating?: number;
  usersRating?: number;
  tvStation?: TvStation;
  tvStationId?: number;
  genre?: Genre;
  genreId?: number;
  subscriptions?: Subscription;
  ratings?: ShowRating;
}
