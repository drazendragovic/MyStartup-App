import { ShowRating } from "./showRating";
import { Subscription } from "./subscription";
import { TvStation } from "./tvStation";

export interface User {
  id?: number;
  firstName?: string;
  surname?: string;
  userName?: string;
  password?: string;
  email?: string;
  avatar: string;
  created?: Date;
  lastModified?: Date;
  lastActivity?: Date;
  isActive?: boolean;
  emailConfirmed?: boolean;
  lockoutEnd?: Date;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  jwToken: string;
  isVerified?: boolean;
  roles?: string[];
  subscriptions?: Subscription[];
  showRatings?: ShowRating[];
  tvStations?: TvStation[];
}
