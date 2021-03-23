import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { CarouselModule } from '@app/@shared/components';
import { TvStationModule } from '../tv-station/tv-station.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    CarouselModule,
    TvStationModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
