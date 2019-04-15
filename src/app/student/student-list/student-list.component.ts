import { Component, OnInit } from "@angular/core";
import { OnBoardingService } from "../../shared/services/onboard/on-boarding.service";
import { OnBoardFormModel } from "src/app/models/on-board-form.model";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  list: OnBoardFormModel[] = [];
  constructor(private board: OnBoardingService) {}

  ngOnInit() {
    this.list = this.board.getOnBoardList();
  }
  onDeleteStudentRecord(id: string) {
    this.board.deleteFromBoardList(parseInt(id));
    this.list = this.board.getOnBoardList();
  }
  filterListByStudent(studentName: string) {
    this.list = this.board.getOnBoardList() ? this.board.getOnBoardList() : [];
    if (studentName.length === 0) {
      return;
    }
    let filteredList: OnBoardFormModel[] = [];
    for (let i = 0; i < this.list.length; i++) {
      if (
        this.list[i].name.toLowerCase() === studentName.toLowerCase() ||
        this.list[i].name.split(" ")[0].toLowerCase() ===
          studentName.toLowerCase()
      ) {
        filteredList.push(this.list[i]);
      }
    }
    this.list = filteredList;
  }
  filterListByCategory(category: string) {
    let filteredList: OnBoardFormModel[] = [];
    this.list = this.board.getOnBoardList() ? this.board.getOnBoardList() : [];
    if (category.toLowerCase() === "all") {
      return;
    }
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].category.toLowerCase() === category.toLowerCase()) {
        filteredList.push(this.list[i]);
      }
    }
    this.list = filteredList;
  }
}
