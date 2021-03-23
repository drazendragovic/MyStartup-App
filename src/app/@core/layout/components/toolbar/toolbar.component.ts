import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@app/@core/authentication/login.component';
import { User } from '@app/@core/models';
import { AccountService, AppConfigService, NotificationService } from '@app/@core/services';
import { SidebarService } from '@app/@shared/components/sidebar/sidebar.service';
import { navigation } from '@app/@shared/navigation/navigation';
import { environment } from '@env/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar!: boolean;
  rightNavbar!: boolean;
  hiddenNavbar!: boolean;
  navigation: any;
  selectedLanguage: any;
  avatarPath!: string;
  defaultAvatar!: string;
  user!: User;
  userRoles!: Array<string>;
  photoUrl = environment.photoUrl;
  bsModalRef!: BsModalRef;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _configService: AppConfigService,
    private _sidebarService: SidebarService,
    public readonly _accountService: AccountService,
    private _notify: NotificationService,
    private modalService: BsModalService,
    private _router: Router
  ) {
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._configService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings: any) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this._accountService.currentAvatarPath.subscribe(avatarPath => this.avatarPath = avatarPath);
    this.defaultAvatar = environment.photoUrl + environment.defaultImg;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  userLogged() {
    return this._accountService.isUserLogged();
  }

  openDialog(dialogMode: string) {
    if (dialogMode === "login") {
      const initialState = {
        title: "LOGIN TO YOUR ACCOUNT",
        mode: dialogMode
      };
      this.bsModalRef = this.modalService.show(LoginComponent, {
        initialState,
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true,
        class: "login"
      });
      this.bsModalRef.content.loginUser.subscribe((values: any) => {
        this.userRoles = this._accountService.decodedToken.Role as Array<string>;
        if (this.userRoles.includes('Admin')) {
          this._router.navigate(['/show']);
        }
        else {
          this._router.navigate(['/show']);
        }
      });
    } else {
      const initialState = {
        title: "REGISTER YOUR ACCOUNT",
        mode: dialogMode
      };
      this.bsModalRef = this.modalService.show(LoginComponent, {
        initialState,
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true,
        class: "register"
      });
      this.bsModalRef.content.loginUser.subscribe((values: any) => {
        console.log(values)
      });
    }

  }

  logout() {
    this._accountService.removeAuthUser();
    this._notify.onSuccess("Hope to see you soon :)")
    this._router.navigate(['/home']);
  }

  toggleSidebarOpen(key: any): void {
    this._sidebarService.getSidebar(key).toggleOpen();
  }

}
