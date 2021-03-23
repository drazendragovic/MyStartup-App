import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(name: string): string {
    return localStorage[name] || sessionStorage.getItem(name);
  }

  saveToken(name: string, token: string, remember: boolean = true) {
    if(this.getToken(name) === null){
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(name, token)
    } else {
      this.destroyToken(token);
    }
  }

  destroyToken(token: string) {
    localStorage.removeItem(token);
    sessionStorage.removeItem(token);
  }

}
