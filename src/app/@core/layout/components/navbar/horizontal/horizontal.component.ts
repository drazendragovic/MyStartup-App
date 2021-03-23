import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfigService } from '@app/@core';
import { NavigationService } from '@app/@core/components/navigation/navigation.service';
import { AccountService } from '@app/@core/services';
import { SidebarService } from '@app/@shared/components/sidebar/sidebar.service';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'navbar-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalComponent implements OnInit, OnDestroy {
  appConfig: any;
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _configService: AppConfigService,
    private _navigationService: NavigationService,
    private _sidebarService: SidebarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._navigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._navigationService.getCurrentNavigation();
      });

    // Subscribe to the config changes
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

}
