import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderOverlayService } from '@app/@core/services';
import { SpinnerModule } from '@app/@shared/components/spinner/spinner/spinner.module';
import { LoaderOverlayComponent } from './loader-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule
  ],
  declarations: [
    LoaderOverlayComponent
  ],
  entryComponents: [
    LoaderOverlayComponent
  ],
  providers: [
    LoaderOverlayService
  ],
  exports: [
  ]
})
export class LoaderOverlayModule {
}
