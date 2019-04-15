import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { OnBoardFormComponent } from "./on-board/on-board-form/on-board-form.component";
import { AuthGuardService } from "./shared/services/auth/auth-guard.service";
const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "student/list",
    component: StudentListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "onboard/form",
    component: OnBoardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
