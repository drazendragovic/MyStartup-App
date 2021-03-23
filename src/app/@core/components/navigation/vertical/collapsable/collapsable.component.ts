import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NavigationItem } from '@app/@core/models/navigation';
import { NavigationService } from '../../navigation.service';
import { animations } from '@app/@shared/animations';

@Component({
  selector: 'nav-vertical-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: animations
})
export class NavVerticalCollapsableComponent implements OnInit, OnDestroy {
  @Input() item: NavigationItem | any;
  @HostBinding('class') classes = 'nav-collapsable nav-item';
  @HostBinding('class.open') public isOpen = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService,
    private _router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd | any) => {
        if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        }
        else {
          this.collapse();
        }
      });

    this._navigationService.onItemCollapsed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (clickedItem: any) => {
          if (clickedItem && clickedItem.children) {
            if (this.isChildrenOf(this.item, clickedItem)) {
              return;
            }
            if (this.isUrlInChildren(this.item, this._router.url)) {
              return;
            }
            if (this.item !== clickedItem) {
              this.collapse();
            }
          }
        }
      );

    if (this.isUrlInChildren(this.item, this._router.url)) {
      this.expand();
    }
    else {
      this.collapse();
    }

    merge(
      this._navigationService.onNavigationItemAdded,
      this._navigationService.onNavigationItemUpdated,
      this._navigationService.onNavigationItemRemoved
    ).pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleOpen(ev: any): void {
    ev.preventDefault();

    this.isOpen = !this.isOpen;

    this._navigationService.onItemCollapsed.next(this.item);
    this._navigationService.onItemCollapseToggled.next();
  }

  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    this._changeDetectorRef.markForCheck();
    this._navigationService.onItemCollapseToggled.next();
  }

  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    this._changeDetectorRef.markForCheck();
    this._navigationService.onItemCollapseToggled.next();
  }

  isChildrenOf(parent: any, item: any): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }

  isUrlInChildren(parent: any, url: any): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isUrlInChildren(child, url)) {
          return true;
        }
      }

      if (child.url === url || url.includes(child.url)) {
        return true;
      }
    }

    return false;
  }


}
