import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  // mock token expires every 30 minutes
  private tokenExpiryTime: number = 1000 * 60 * 30;

  isAuthenticated() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token &&
      token.isLoggedIn &&
      token.expiresAt - new Date().getTime() > 0
      ? true
      : false;
  }
  getToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
  }
  setToken(admin) {
    const token = {
      adminId: admin.adminId,
      adminName: admin.adminName,
      isLoggedIn: true,
      expiresAt: new Date().getTime() + this.tokenExpiryTime
    };
    localStorage.setItem("token", JSON.stringify(token));
  }
  removeToken() {
    localStorage.setItem("token", JSON.stringify({}));
  }
}
