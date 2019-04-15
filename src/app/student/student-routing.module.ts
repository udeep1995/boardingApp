import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentListComponent } from "./student-list/student-list.component";
import { AuthGuardService } from "../shared/services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "list",
    component: StudentListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
