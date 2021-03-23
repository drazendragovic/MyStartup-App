import { Show } from "./show";
import { User } from "./user";

export interface Slide {
  slideId?: number;
  srcUrl: string;
  previewUrl: string;
  title: string;
  showName?: string;
  show?: Show;
  showId?: number;
  user?: User;
}




