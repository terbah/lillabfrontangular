import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeePerUserComponent } from './idee-per-user.component';

describe('IdeePerUserComponent', () => {
  let component: IdeePerUserComponent;
  let fixture: ComponentFixture<IdeePerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeePerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeePerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
