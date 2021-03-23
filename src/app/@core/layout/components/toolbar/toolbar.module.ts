import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '@app/@shared/shared.module';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
