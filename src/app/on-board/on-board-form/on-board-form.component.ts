import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentModel } from "src/app/models/document.model";
import { OnBoardFormModel } from "src/app/models/on-board-form.model";
import { OnBoardingService } from "../../shared/services/onboard/on-boarding.service";

@Component({
  selector: "app-on-board-form",
  templateUrl: "./on-board-form.component.html",
  styleUrls: ["./on-board-form.component.css"]
})
export class OnBoardFormComponent implements OnInit {
  categories: string[] = ["Domestic", "International"];
  documents: DocumentModel[] = [];
  formModel: OnBoardFormModel = new OnBoardFormModel();
  onBoardForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[a-zA-Z][a-zA-Z ]*")
    ]),
    category: new FormControl("", [Validators.required]),
    docs: new FormGroup({}),
    fatherName: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z][a-zA-Z ]*")
    ]),
    motherName: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z][a-zA-Z ]*")
    ]),
    dob: new FormControl("", [
      Validators.required,
      OnBoardFormComponent.customDobValidation
    ]),
    lastClassScore: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9][0-9][.][0-9][0-9]$")
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private board: OnBoardingService,
    private router: Router
  ) {}

  ngOnInit() {
    const path = this.route.snapshot.routeConfig.path.split("/");
    const routePath = path[0];
    if (routePath !== null && routePath === "view") {
      const id: string = this.route.snapshot.params.id;
      const student: OnBoardFormModel = this.board.getStudentFromListById(
        parseInt(id)
      );
      student.id = parseInt(id);
      this.viewStudentForm(student);
    } else if (routePath !== null && routePath === "edit") {
      const id: string = this.route.snapshot.params.id;
      const student: OnBoardFormModel = this.board.getStudentFromListById(
        parseInt(id)
      );
      student.id = parseInt(id);
      this.editStudentForm(student);
    }
    this.formControlsValueChanges();
  }
  /**
   * fills up on boarding form from student parameter
   * @param student - student whose values need to be prefilled
   */
  private fillUpOnBoardForm(student: OnBoardFormModel) {
    const docsKeys = Object.keys(student.docs);
    this.formModel = {
      ...this.formModel,
      ...student
    };
    this.onBoardForm.get("name").setValue(student.name);
    this.onBoardForm.get("fatherName").setValue(student.fatherName);
    this.onBoardForm.get("motherName").setValue(student.motherName);
    this.onBoardForm.get("dob").setValue(student.dob);
    this.onBoardForm.get("category").setValue(student.category);
    this.onBoardForm.get("lastClassScore").setValue(student.lastClassScore);
    const docFormGroup = this.onBoardForm.get("docs") as FormGroup;

    docsKeys.forEach(docKey => {
      docFormGroup.addControl(
        docKey.toString(),
        new FormControl(student.docs[docKey])
      );
    });
    this.getDocuments();
  }

  /**
   * views student on boarding data on form and disable inputs
   * @param student - student data
   */
  viewStudentForm(student: OnBoardFormModel) {
    this.fillUpOnBoardForm(student);
    this.onBoardForm.get("name").disable();
    this.onBoardForm.get("fatherName").disable();
    this.onBoardForm.get("motherName").disable();
    this.onBoardForm.get("dob").disable();
    this.onBoardForm.get("category").disable();
    this.onBoardForm.get("lastClassScore").disable();
    this.onBoardForm.get("docs").disable();
  }

  /**
   * views student on boarding data on form and disable inputs
   * @param student - student data
   */
  editStudentForm(student: OnBoardFormModel) {
    this.fillUpOnBoardForm(student);
  }

  /**
   * creates dynamic form group and form controls for documents
   */
  addDocumentsToForm() {
    const docs = this.onBoardForm.get("docs") as FormGroup;
    const allKeys = Object.keys(docs.value);
    allKeys.forEach(key => {
      docs.removeControl(key);
    });
    this.documents.forEach(document => {
      docs.addControl(document.docName.toString(), new FormControl(false));
    });
  }

  /**
   * on boarding form submit
   */
  onSubmit() {
    this.board.saveToBoardList(this.formModel);
    this.formModel = new OnBoardFormModel();
    this.onBoardForm.reset();
    this.documents = [];
    this.router.navigateByUrl("onboard/form");
  }

  /**
   * get documents from json
   */
  getDocuments() {
    this.board.getDocuments().subscribe(docs => {
      const allKeys = Object.keys(docs);
      this.documents = [];
      allKeys.forEach(key => {
        if (key.toLowerCase() === this.formModel.category.toLowerCase()) {
          this.documents = docs[key];
        }
      });
    });
  }

  /**
   * returns docs form control in onboardform controls
   */
  get docsControls() {
    const docs = this.onBoardForm.get("docs") as FormGroup;
    return docs.controls;
  }

  /**
   * custom date of birth validator function
   */
  private static customDobValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const currDate = new Date();
    if (control.value !== undefined && control.value != null) {
      const inpDate = new Date(control.value.toString());
      if (currDate.getTime() - inpDate.getTime() <= 0)
        return { dobError: true };
    }
    return null;
  }

  /**
   * trigger whenever there is change in value of any form control in onboardform
   */
  formControlsValueChanges() {
    this.onBoardForm.get("name").valueChanges.subscribe((value: string) => {
      this.formModel.name = value;
    });

    this.onBoardForm.get("category").valueChanges.subscribe((value: string) => {
      this.formModel.category = value;
      if (this.formModel.category === null) {
        return;
      }
      this.board.getDocuments().subscribe(docs => {
        const allKeys = Object.keys(docs);
        this.documents = [];
        allKeys.forEach(key => {
          if (key.toLowerCase() === this.formModel.category.toLowerCase()) {
            this.documents = docs[key];
          }
        });
        this.addDocumentsToForm();
      });
    });

    this.onBoardForm
      .get("fatherName")
      .valueChanges.subscribe((value: string) => {
        this.formModel.fatherName = value;
      });

    this.onBoardForm
      .get("motherName")
      .valueChanges.subscribe((value: string) => {
        this.formModel.motherName = value;
      });

    this.onBoardForm.get("dob").valueChanges.subscribe((value: Date) => {
      this.formModel.dob = value;
    });

    this.onBoardForm
      .get("lastClassScore")
      .valueChanges.subscribe((value: number) => {
        this.formModel.lastClassScore = value;
      });

    this.onBoardForm.get("docs").valueChanges.subscribe((value: string) => {
      const keys = Object.keys(value);
      keys.forEach(key => {
        this.formModel.docs[key] = value[key];
      });
    });
  }
}
