import { NgModule } from '@angular/core';
import { HorizontalLayoutModule } from './horizontal/horizontal-layout.module';
import { VerticalLayoutModule } from './vertical/vertical-layout.module';

@NgModule({
  imports: [
    VerticalLayoutModule,
    HorizontalLayoutModule
  ],
  exports: [
    VerticalLayoutModule,
    HorizontalLayoutModule
  ]
})
export class LayoutModule {
}
