import { Pipe, PipeTransform } from '@angular/core';
import { Genre, Show } from '@app/@core/models';

@Pipe({name: 'genrefilter'})
export class GenreFilterPipe implements PipeTransform {

  transform(items: Array<Show>, genre: string): Array<Show> {
    return items.filter(item => item.genre?.name === genre);
  }
}
