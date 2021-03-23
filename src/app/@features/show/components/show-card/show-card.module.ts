import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import {MatCardModule} from '@angular/material/card';

import { PipesModule } from '@app/@shared/pipes/pipes.module';
import { ShowCardComponent } from './show-card.component';

@NgModule({
  declarations: [
    ShowCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    PipesModule
  ],
  exports: [
    ShowCardComponent
  ]
})
export class ShowCardModule {}
