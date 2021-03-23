import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { NavigationComponent } from './navigation.component';
import { NavHorizontalItemComponent } from './horizontal/item/item.component';
import { NavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { NavVerticalItemComponent } from './vertical/item/item.component';
import { NavVerticalGroupComponent } from './vertical/group/group.component';
import { NavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule
  ],
  exports: [
    NavigationComponent
  ],
  declarations: [
    NavigationComponent,
    NavHorizontalItemComponent,
    NavHorizontalCollapsableComponent,
    NavVerticalItemComponent,
    NavVerticalGroupComponent,
    NavVerticalCollapsableComponent
  ]
})
export class NavigationModule {
}
