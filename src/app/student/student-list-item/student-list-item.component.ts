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
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  deleteCard(cardId: string) {
    this.deleteStudentRecord.emit(cardId);
  }
}
