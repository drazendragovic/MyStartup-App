import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { PerfectScrollbarDirective } from '@app/@shared/directives/perfect-scrollbar.directive';
import { NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from '@app/@core';
import { NavigationService } from '@app/@core/components/navigation/navigation.service';
import { SidebarService } from '@app/@shared/components/sidebar/sidebar.service';
import { environment } from '@env/environment';

@Component({
  selector: 'navbar-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalComponent implements OnInit, OnDestroy {
  appConfig: any;
  navigation: any;
  photoUrl = environment.photoUrl;

  private _perfectScrollbar!: PerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _configService: AppConfigService,
    private _navigationService: NavigationService,
    private _sidebarService: SidebarService,
    private _router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  @ViewChild(PerfectScrollbarDirective, { static: true })
  set directive(theDirective: PerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._perfectScrollbar = theDirective;

    this._navigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._perfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          this._perfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
        });
      }
      );
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._sidebarService.getSidebar('navbar')) {
          this._sidebarService.getSidebar('navbar').close();
        }
      }
      );

    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this.appConfig = config;
      });

    this._navigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._navigationService.getCurrentNavigation();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpened(): void {
    this._sidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded(): void {
    this._sidebarService.getSidebar('navbar').toggleFold();
  }

}
