import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxMaterialRatingModule } from 'ngx-material-rating';

import { SharedModule } from '@app/@shared';
import { PipesModule } from '@app/@shared/pipes/pipes.module';
import { ShowDetailsComponent } from './show-details.component';

@NgModule({
  declarations: [
    ShowDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaterialRatingModule,
    MatCardModule,
    PipesModule
  ],
  exports: [
    ShowDetailsComponent
  ]
})
export class ShowDetailsModule {}
