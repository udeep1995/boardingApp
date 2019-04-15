import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentListComponent } from "./student-list/student-list.component";
import { AuthGuardService } from "../shared/services/auth/auth-guard.service";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
