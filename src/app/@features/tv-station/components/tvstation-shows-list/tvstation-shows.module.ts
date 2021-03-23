import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';

import { TvstationShowsListComponent } from './tvstation-shows-list.component';
import { ShowCardModule } from '@app/@features/show/components/show-card/show-card.module';

@NgModule({
  declarations: [
    TvstationShowsListComponent
  ],
  imports: [
    SharedModule,
    ShowCardModule
  ],
  exports: [
    TvstationShowsListComponent
  ]
})
export class TvStationShowsModule {}
