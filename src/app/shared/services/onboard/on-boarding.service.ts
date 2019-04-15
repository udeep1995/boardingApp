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

  getOnBoardList() {
    if (!this.auth.isAuthenticated()) {
      return;
    }
    const onBoardList = JSON.parse(localStorage.getItem("onBoardList"));
    return onBoardList;
  }

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

  private saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

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

  getDocuments(): Observable<DocumentModel[]> {
    const url = "../../../onboardingapp/assets/onboard_docs.json";
    return this.http.get<DocumentModel[]>(url);
  }
}
