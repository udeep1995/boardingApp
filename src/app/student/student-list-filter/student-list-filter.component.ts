import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-student-list-filter",
  templateUrl: "./student-list-filter.component.html",
  styleUrls: ["./student-list-filter.component.css"]
})
export class StudentListFilterComponent implements OnInit {
  constructor() {}
  categories = ["All", "Domestic", "International"];
  filterForm = new FormGroup({
    category: new FormControl(""),
    searchStudent: new FormControl("")
  });
  @Output() filterCategory = new EventEmitter<string>();
  @Output() filterStudent = new EventEmitter<string>();

  ngOnInit() {
    this.filterForm.get("category").setValue(this.categories[0]);
    this.formControlValueChanges();
  }
  formControlValueChanges() {
    this.filterForm.get("category").valueChanges.subscribe(value => {
      this.filterCategory.emit(value);
    });
    this.filterForm.get("searchStudent").valueChanges.subscribe(value => {
      this.filterStudent.emit(value);
    });
  }
}
