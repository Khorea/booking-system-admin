import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainsComponent } from './view-trains.component';

describe('ViewTrainsComponent', () => {
  let component: ViewTrainsComponent;
  let fixture: ComponentFixture<ViewTrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
