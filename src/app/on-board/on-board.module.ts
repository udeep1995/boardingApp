import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { OnBoardRoutingModule } from "./on-board-routing.module";
import { OnBoardFormComponent } from "./on-board-form/on-board-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [OnBoardFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OnBoardRoutingModule
  ]
})
export class OnBoardModule {}
