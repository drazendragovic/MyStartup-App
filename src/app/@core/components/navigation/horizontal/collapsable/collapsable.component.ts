import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from '@app/@core/services/config.service';
import { animations } from '@app/@shared/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nav-horizontal-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: animations
})
export class NavHorizontalCollapsableComponent implements OnInit, OnDestroy {
  appConfig: any;
  isOpen = false;

  @HostBinding('class') classes = 'nav-collapsable nav-item';
  @Input() item: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _configService: AppConfigService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (config: any) => {
          this.appConfig = config;
        }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  @HostListener('mouseenter')
  open(): void {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  close(): void {
    this.isOpen = false;
  }

}
