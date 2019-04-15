import { Injectable } from "@angular/core";
import { AuthService } from "../../../authentication/services/auth.service";
import { CanActivate, Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  /**
   * returns true if user is authenticated otherwise false
   */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
  /**
   * returns admin name from token stored in local storage
   */
  getAdmin(): string {
    return this.auth.getToken().adminName;
  }
}
