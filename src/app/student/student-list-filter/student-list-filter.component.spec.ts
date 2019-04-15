import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentListFilterComponent } from "./student-list-filter.component";

describe("StudentListFilterComponent", () => {
  let component: StudentListFilterComponent;
  let fixture: ComponentFixture<StudentListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
