import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NavigationModule } from '@app/@core';
import { SharedModule } from '@app/@shared';
import { NavbarVerticalComponent } from './vertical.component';

@NgModule({
  declarations: [
    NavbarVerticalComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    SharedModule,
    NavigationModule
  ],
  exports: [
    NavbarVerticalComponent
  ]
})
export class NavbarVerticalModule {
}
