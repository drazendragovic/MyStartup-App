import { NgModule } from '@angular/core';

import { SharedModule } from '@app/@shared/shared.module';
import { NavbarHorizontalModule } from './horizontal/horizontal.module';
import { NavbarComponent } from './navbar.component';
import { NavbarVerticalModule } from './vertical/vertical.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    SharedModule,
    NavbarHorizontalModule,
    NavbarVerticalModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
