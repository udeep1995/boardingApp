import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    category: new FormControl("", [Validators.required]),
    docs: new FormGroup({}),
    fatherName: new FormControl("", [Validators.required]),
    motherName: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    lastClassScore: new FormControl("", [
      Validators.required
      // Validators.pattern(/^\d{2}\.\d{2}$/)
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private board: OnBoardingService,
    private router: Router
  ) {}

  ngOnInit() {
    const path = this.route.snapshot.routeConfig.path.split("/");
    console.log(path);
    if (path[1] !== null && path[1] === "view") {
      const id: string = this.route.snapshot.params.id;
      const student: OnBoardFormModel = this.board.getStudentFromListById(
        parseInt(id)
      );
      student.id = parseInt(id);
      this.viewStudentForm(student);
    } else if (path[1] !== null && path[1] === "edit") {
      const id: string = this.route.snapshot.params.id;
      const student: OnBoardFormModel = this.board.getStudentFromListById(
        parseInt(id)
      );
      student.id = parseInt(id);
      this.editStudentForm(student);
    }
    this.formControlsValueChanges();
  }

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

  onSubmit() {
    this.board.saveToBoardList(this.formModel);
    this.formModel = new OnBoardFormModel();
    this.onBoardForm.reset();
    this.documents = [];
    this.router.navigateByUrl("onboard/form");
  }

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

  get docsControls() {
    const docs = this.onBoardForm.get("docs") as FormGroup;
    return docs.controls;
  }
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
