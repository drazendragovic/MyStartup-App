import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { TvStationListModule } from './components/tvstations-list/tvstations-list.module';
import { TvStationService } from './services/tvstation.service';

import { TvStationComponent } from './tv-station.component';

@NgModule({
  declarations: [
    TvStationComponent
  ],
  imports: [
    SharedModule,
    TvStationListModule
  ],
  providers: [
    TvStationService
  ],
  exports: [
    TvStationComponent
  ],
})
export class TvStationModule {}
