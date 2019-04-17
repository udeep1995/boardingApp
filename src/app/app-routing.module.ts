import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";
const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "student",
    loadChildren: "./student/student.module#StudentModule"
  },
  {
    path: "onboard",
    loadChildren: "./on-board/on-board.module#OnBoardModule"
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
