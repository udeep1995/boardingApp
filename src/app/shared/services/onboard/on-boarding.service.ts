import { Injectable } from "@angular/core";
import { OnBoardFormModel } from "src/app/models/on-board-form.model";
import { AuthService } from "src/app/authentication/services/auth.service";
import { DocumentModel } from "src/app/models/document.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OnBoardingService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  /**
   * returns students boarded stored in local storage
   */
  getOnBoardList() {
    if (!this.auth.isAuthenticated()) {
      return;
    }
    const onBoardList = JSON.parse(localStorage.getItem("onBoardList"));
    return onBoardList;
  }
  /**
   * returns student from board list by matching specific id parameter
   * @param id - student board id
   */
  getStudentFromListById(id: number): OnBoardFormModel {
    let formModel: OnBoardFormModel = null;
    const list = this.getOnBoardList();
    if (list === null || list.length === 0) {
      return formModel;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        formModel = list[i];
        break;
      }
    }
    return formModel;
  }

  /**
   * edits board list with form model filtering out particular student
   */
  private editToBoardList(
    list: OnBoardFormModel[],
    formModel: OnBoardFormModel
  ) {
    let studentIndex: number = null;
    let currStudent: OnBoardFormModel = null;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === formModel.id) {
        currStudent = list[i];
        studentIndex = i;
      }
    }
    list[studentIndex] = {
      ...currStudent,
      ...formModel
    };

    this.saveToLocalStorage("onBoardList", JSON.stringify(list));
    return;
  }

  /**
   * utility method to store items in local storage
   * @param key - item name required to store in local storage
   * @param value - item value required to store in local storage
   */
  private saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   *saves student data to board list
   * @param formModel - student data
   */
  saveToBoardList(formModel: OnBoardFormModel) {
    if (!this.auth.isAuthenticated()) {
      return;
    }
    const list = this.getOnBoardList();
    if (list === null || list.length === 0) {
      formModel.id = 1;
      localStorage.setItem("onBoardList", JSON.stringify([formModel]));
    } else {
      if (formModel.id > 0) {
        this.editToBoardList(list, formModel);
        return;
      }
      formModel.id = list[list.length - 1].id + 1;
      list.push(formModel);
      this.saveToLocalStorage("onBoardList", JSON.stringify(list));
    }
  }
  /**
   * deletes student from board list
   * @param id - student id
   */
  deleteFromBoardList(id: number) {
    if (!this.auth.isAuthenticated()) {
      return;
    }
    const list = this.getOnBoardList();
    if (list === null || list.length === 0) {
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let idInList = parseInt(list[i].id);
      if (idInList === id) {
        list.splice(i, 1);
        break;
      }
    }
    this.saveToLocalStorage("onBoardList", JSON.stringify(list));
  }

  /**
   * returns documents json
   */
  getDocuments(): Observable<DocumentModel[]> {
    const url = "../../assets/onboard_docs.json";
    return this.http.get<DocumentModel[]>(url);
  }
}
