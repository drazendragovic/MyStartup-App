import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { FilterPipe } from './filter.pipe';
import { GenreFilterPipe } from './genreFilter.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        FilterPipe,
        GenreFilterPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        FilterPipe,
        GenreFilterPipe
    ]
})
export class PipesModule {
}
