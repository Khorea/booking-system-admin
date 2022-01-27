import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddTrainComponent } from './edit-add-train.component';

describe('EditAddTrainComponent', () => {
  let component: EditAddTrainComponent;
  let fixture: ComponentFixture<EditAddTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddTrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
