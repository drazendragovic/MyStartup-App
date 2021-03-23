import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { AccountService } from '@app/@core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  _variant: string;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _accountService: AccountService
  ) {
    this._variant = 'horizontal';
  }

  get variant(): string {
    return this._variant;
  }

  @Input()
  set variant(value: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, this.variant);
    this._variant = value;
    this._renderer.addClass(this._elementRef.nativeElement, value);
  }

}
