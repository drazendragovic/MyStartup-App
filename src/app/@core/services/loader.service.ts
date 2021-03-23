import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { LoaderOverlayComponent } from '../components/loader/loader-overlay/loader-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderOverlayService {
  private overlayRef: OverlayRef | any;

  constructor(private overlay: Overlay) { }

  public show(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(LoaderOverlayComponent));
    });
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }

  public readonly spinner = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());
}
