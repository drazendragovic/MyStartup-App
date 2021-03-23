import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directive.module';
import { PipesModule } from './pipes/pipes.module';
import { CarouselModule, SidebarModule } from './components';
import { SpinnerOverlayWrapperModule } from './components/spinner/spinner-overlay-wrapper/spinner-overlay-wrapper.module';
import { SpinnerModule } from './components/spinner/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DirectivesModule,
    PipesModule,
    CarouselModule,
    SpinnerModule,
    SpinnerOverlayWrapperModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DirectivesModule,
    PipesModule,
    CarouselModule,
    SpinnerModule,
    SpinnerOverlayWrapperModule
  ]
})
export class SharedModule {

}
