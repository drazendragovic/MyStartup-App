import { Show } from "./show";

export interface Genre {
  genreId?: number;
  name: string;
  shows?: Show[];
  showsTotal?: number;
  checked?: boolean;
}
