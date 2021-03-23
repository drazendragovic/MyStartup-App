import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Slide } from '@app/@core/models/slide';
import { animations } from '@app/@shared/animations';
import { CarouselService } from '@app/@shared/components/carousel/carousel.service';
import { environment } from '@env/environment';
import { Gallery, GalleryRef } from 'ng-gallery';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [animations]
})
export class CarouselComponent implements OnInit {
  galleryId = 'homeCarousel';
  slides: Slide[];

  constructor(private gallery: Gallery, private carouselService: CarouselService) { this.slides = []; }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    this.carouselService.getAllSlides(1, 10).subscribe((slides: Slide[]) => {
      this.slides = slides;
      this.slides.forEach(slide =>
        galleryRef.addImage({
          src: environment.photoUrl + slide.srcUrl.toString(),
          title: slide.title
        }))
    });
  }

}
