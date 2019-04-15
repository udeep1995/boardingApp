import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "onboard",
    loadChildren: "./on-board/on-board.module#OnBoardModule"
  },
  {
    path: "student",
    loadChildren: "./student/student.module#StudentModule"
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