import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private auth: AuthService, private router: Router) {}
  private admins = [
    {
      adminId: 1,
      adminName: "test",
      password: "test"
    },
    {
      adminId: 2,
      adminName: "username",
      password: "password"
    },
    {
      adminId: 3,
      adminName: "admin",
      password: "admin"
    }
  ];
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl("onboard/form");
    }
  }
  /**
   * checks for valid admins and create new token on local storage
   */
  onSubmit() {
    let currAdmin = null;
    this.admins.forEach(admin => {
      if (
        admin.adminName === this.username &&
        admin.password === this.password
      ) {
        currAdmin = {
          adminId: admin.adminId,
          adminName: admin.adminName
        };
      }
    });
    if (currAdmin != null) {
      this.auth.setToken(currAdmin);
      this.router.navigate(["onboard"]);
    }
  }
}
