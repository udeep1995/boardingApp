import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-student-list-item",
  templateUrl: "./student-list-item.component.html",
  styleUrls: ["./student-list-item.component.css"]
})
export class StudentListItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() category: string;
  @Output() deleteStudentRecord = new EventEmitter<string>();
  isModalOpen: boolean = false;
  constructor() {}

  ngOnInit() {}

  /**
   * function to toggle modal
   */
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  /**
   * emits functions to delete student with student id
   * @param cardId - student id
   */
  deleteCard(cardId: string) {
    this.deleteStudentRecord.emit(cardId);
  }
}
