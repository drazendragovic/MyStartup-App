import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/@core';
import { AccountService } from '@app/@core/services';
import { navigation } from '@app/@shared/navigation/navigation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayoutComponent implements OnInit, OnDestroy {
  appConfig: any;
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _configService: AppConfigService, private _accountService: AccountService) {
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this.appConfig = config;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  userLogged() {
    return this._accountService.isUserLogged();
  }

}
