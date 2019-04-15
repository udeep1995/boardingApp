import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";
import { StudentModule } from "./student/student.module";
import { OnBoardModule } from "./on-board/on-board.module";
const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "student",
    loadChildren: () => StudentModule
  },
  {
    path: "onboard",
    loadChildren: () => OnBoardModule
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
