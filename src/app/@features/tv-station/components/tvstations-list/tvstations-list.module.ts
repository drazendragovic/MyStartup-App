import { NgModule } from "@angular/core";

import { SharedModule } from "@app/@shared";
import { TvStationShowsModule } from "../tvstation-shows-list/tvstation-shows.module";
import { TvstationsListComponent } from "./tvstations-list.component";

@NgModule({
  declarations: [
    TvstationsListComponent
  ],
  imports: [
    SharedModule,
    TvStationShowsModule
  ],
  exports: [
    TvstationsListComponent
  ]
})
export class TvStationListModule {
}
