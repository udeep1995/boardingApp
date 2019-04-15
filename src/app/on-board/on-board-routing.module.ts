import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../shared/services/auth/auth-guard.service";
import { OnBoardFormComponent } from "./on-board-form/on-board-form.component";
const routes: Routes = [
  {
    path: "onboard/edit/:id",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "onboard/view/:id",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardRoutingModule {}
