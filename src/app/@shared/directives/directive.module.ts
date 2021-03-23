import { NgModule } from '@angular/core';
import { HasRoleDirective } from './hasRole.directive';
import { InnerScrollDirective } from './inner-scroll.directive';
import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';

@NgModule({
  declarations: [
    HasRoleDirective,
    InnerScrollDirective,
    PerfectScrollbarDirective
  ],
  imports: [],
  exports: [
    HasRoleDirective,
    InnerScrollDirective,
    PerfectScrollbarDirective
  ]
})
export class DirectivesModule {
}
