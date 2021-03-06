import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatchMediaService } from '@app/@core/services/match-media.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'inner-scroll'
})
export class InnerScrollDirective implements OnInit, OnDestroy {
  private _parent: any;
  private _grandParent: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _elementRef: ElementRef,
    private _mediaMatchService: MatchMediaService,
    private _renderer: Renderer2
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._parent = this._renderer.parentNode(this._elementRef.nativeElement);

    if (!this._parent) {
      return;
    }

    this._grandParent = this._renderer.parentNode(this._parent);

    this._mediaMatchService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((alias) => {

        if (alias === 'xs') {
          this._removeClass();
        }
        else {
          this._addClass();
        }
      });
  }

  ngOnDestroy(): void {
    if (!this._parent) {
      return;
    }

    this._removeClass();

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private _addClass(): void {
    this._renderer.addClass(this._grandParent, 'inner-scroll');
  }

  private _removeClass(): void {
    this._renderer.removeClass(this._grandParent, 'inner-scroll');
  }
}
