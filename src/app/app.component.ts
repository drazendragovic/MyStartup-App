import { Platform } from '@angular/cdk/platform';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppConfigService, NotificationService, SplashScreenService } from './@core';
import { AccountService } from './@core/services/account.service';
import { animations } from './@shared/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SidebarService } from './@shared/components/sidebar/sidebar.service';
import { NavigationService } from './@core/components/navigation/navigation.service';
import { navigation } from './@shared/navigation/navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [animations]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BroadcastScheduler-App';
  appConfig: any;
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(@Inject(DOCUMENT) private document: any,
    private _accountService: AccountService,
    private _configService: AppConfigService,
    private _platform: Platform,
    private _splashScreenService: SplashScreenService,
    private _navigationService: NavigationService,
    private _sidebarService: SidebarService) {

    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
    this.navigation = navigation;
    this._navigationService.register('main', this.navigation);
    this._navigationService.setCurrentNavigation('main');

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._accountService.populate();

    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this.appConfig = config;

        // Boxed
        if (this.appConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        }
        else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.appConfig.colorTheme);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
