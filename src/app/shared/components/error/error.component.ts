import { Component, OnInit } from "@angular/core";
import { AuthGuardService } from "../../services/auth/auth-guard.service";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent implements OnInit {
  constructor(private auth: AuthGuardService) {}
  public adminName: string;
  ngOnInit() {
    this.adminName = this.auth.getAdmin();
  }
}
