import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { User } from '../models';
import { JwtService } from './jwt.service';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.serverUrl + 'Account/';
  jwtHelper = new JwtHelperService;
  decodedToken: any;
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private avatarPath = new BehaviorSubject<string>(environment.photoUrl + environment.defaultImg);
  public currentAvatarPath = this.avatarPath.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService, private jwtService: JwtService, private notify: NotificationService) { }

  login(model: any) {
    return this.apiService.post(this.baseUrl + "Authenticate", model)
      .pipe(
        map((user) => {
          if (user != null) {
            let currentUser: User = user.data;
            if (currentUser) {
              this.setAuthUser(currentUser);
            }
            return user;
          }
        })
      );
  }

  register(user: User) {
    return this.apiService.post(this.baseUrl + 'Register', { user });
  }

  populate() {
    const token = this.jwtService.getToken("token");
    const user: User = JSON.parse(this.jwtService.getToken("user"));

    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    else if(user) {
      this.currentUserSubject.next(user);
      this.changeUserAvatar(user.avatar);
    } else {
      this.removeAuthUser();
    }
  }

  removeAuthUser(): Observable<boolean> {
    this.jwtService.destroyToken("token");
    this.jwtService.destroyToken("user");
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
    this.decodedToken = null;
    return of(true);
  }

  setAuthUser(user: User) {
    this.jwtService.saveToken("token", user.jwToken);
    this.jwtService.saveToken("user", JSON.stringify(user));
    this.decodedToken = this.jwtHelper.decodeToken(user.jwToken);
    this.changeUserAvatar(user.avatar);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getUserById(userId: string | null | undefined, isCurrentUser: boolean | undefined): Observable<any> {
    let url_ = this.baseUrl + "/api/Account/GetUserById?";
    if (userId !== undefined && userId !== null)
        url_ += "userId=" + encodeURIComponent("" + userId) + "&";
    if (isCurrentUser === null)
        this.notify.onError("The parameter 'isCurrentUser' cannot be null.");
    else if (isCurrentUser !== undefined)
        url_ += "isCurrentUser=" + encodeURIComponent("" + isCurrentUser) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.apiService.get(url_);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.apiService.put(this.baseUrl + 'UpdateUserProfile', { user });
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.put(this.baseUrl + "UpdateUser", { user })
    .pipe(
      map((response: User) => {
      this.currentUserSubject.next(response);
      return response;
    }));
  }

  changeUserAvatar(avatar: string | null | undefined) {
    this.avatarPath.next(environment.photoUrl + avatar);
  }

  isUserLogged() {
    let token: any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  checkRole(roles: string[] | undefined): boolean {
    let isRole = false;

    const userRoles = this.decodedToken.roles as Array<string>;
    roles?.forEach(element => {
      if(userRoles.includes(element)) {
        isRole = true;
        return;
      }
    });
    return isRole;
  }
}
