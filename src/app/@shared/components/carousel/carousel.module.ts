import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel.component';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryModule.withConfig({
      imageSize: "cover",
      loop: true,
      panSensitivity: 25,
      autoPlay: true,
      counter: false,
      thumb: false,
      slidingDirection: "horizontal",
      nav: true,
      dots: true,
      dotsSize: 30,
      dotsPosition: "bottom",
      playerInterval: 8000
    })
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule {
}
