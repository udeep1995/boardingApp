import { Component, OnInit } from "@angular/core";
import { AuthGuardService } from "src/app/shared/services/auth/auth-guard.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  adminName: string = "";
  constructor(private auth: AuthGuardService) {}

  ngOnInit() {
    this.adminName = this.auth.getAdmin().toUpperCase()
      ? this.auth.getAdmin().toUpperCase()
      : this.adminName;
  }
}
