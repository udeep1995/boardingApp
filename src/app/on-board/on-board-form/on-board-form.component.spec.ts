import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardFormComponent } from './on-board-form.component';

describe('OnBoardFormComponent', () => {
  let component: OnBoardFormComponent;
  let fixture: ComponentFixture<OnBoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
