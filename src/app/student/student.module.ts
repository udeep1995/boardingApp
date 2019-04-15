import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentListFilterComponent } from "./student-list-filter/student-list-filter.component";
import { StudentListItemComponent } from "./student-list-item/student-list-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    StudentListComponent,
    StudentListFilterComponent,
    StudentListItemComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {}
