import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeeDetailComponent } from './idee-detail.component';

describe('IdeeDetailComponent', () => {
  let component: IdeeDetailComponent;
  let fixture: ComponentFixture<IdeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
