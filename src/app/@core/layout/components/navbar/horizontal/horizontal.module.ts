import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationModule } from '@app/@core/components';
import { SharedModule } from '@app/@shared/shared.module';
import { NavbarHorizontalComponent } from './horizontal.component';

@NgModule({
  declarations: [
    NavbarHorizontalComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    SharedModule,
    NavigationModule
  ],
  exports: [
    NavbarHorizontalComponent
  ]
})
export class NavbarHorizontalModule {
}
