import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { ShowCardModule } from './components/show-card/show-card.module';
import { ShowDetailsModule } from './components/show-details/show-details.module';
import { ShowService } from './services/show.service';
import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';


@NgModule({
  declarations: [
    ShowComponent
  ],
  imports: [
    SharedModule,
    ShowRoutingModule,
    ShowCardModule,
    ShowDetailsModule
  ],
  providers: [
    ShowService
  ],
  exports: [
    ShowComponent
  ],
})
export class ShowModule { }
