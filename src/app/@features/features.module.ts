import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { ShowModule } from './show/show.module';
import { TvStationModule } from './tv-station/tv-station.module';

@NgModule({
  imports: [
    HomeModule,
    TvStationModule,
    ShowModule
  ],
  exports: [
    HomeModule,
    TvStationModule,
    ShowModule
  ]
})
export class FeaturesModule {}
