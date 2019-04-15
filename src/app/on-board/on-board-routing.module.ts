import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../shared/services/auth/auth-guard.service";
import { OnBoardFormComponent } from "./on-board-form/on-board-form.component";
const routes: Routes = [
  {
    path: "form",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "edit/:id",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "view/:id",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "",
    redirectTo: "form",
    pathMatch: "full",
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardRoutingModule {}
