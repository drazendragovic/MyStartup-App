import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models';
import { AccountService, NotificationService } from '../services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginUser = new EventEmitter();

  title!: string;
  mode!: string;
  user!: User;
  avatarPath!: string;
  defaultAvatar!: string;
  photoUrl = environment.photoUrl;

  public nestedForm: FormGroup = new FormGroup({
    loginInfo: new FormControl(""),
    registerInfo: new FormControl("")
  });

  constructor(
    public bsModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _notify: NotificationService) {
  }

  ngOnInit() {
    this._accountService.currentAvatarPath.subscribe(avatarPath => this.avatarPath = avatarPath);
    this.defaultAvatar = environment.photoUrl + environment.defaultImg;
  }

  onLoginClick(mode: string) {
    if (this.nestedForm.valid) {
      if (mode === 'login') {
        var model = JSON.stringify(this.nestedForm.controls.loginInfo.value);
        if (model !== null) {
          this._accountService.login(model).subscribe(data => {
            if (data) {
              this.user = data.data;
              this.nestedForm.reset();
              this._notify.onSuccess("Welcome back "+ this.user.userName)
              this.avatarPath = environment.photoUrl + this.user.avatar;
            }
            this.loginUser.emit(this.user);
          })
        }
      } else {
        this.user = Object.assign({}, this.nestedForm.controls.registerInfo.value);
        if (this.user !== null) {
          this.loginUser.emit(this.user);
        }
      }

    }
    this.bsModalRef.hide();

  }

}

