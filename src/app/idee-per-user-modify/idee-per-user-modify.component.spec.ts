import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeePerUserModifyComponent } from './idee-per-user-modify.component';

describe('IdeePerUserModifyComponent', () => {
  let component: IdeePerUserModifyComponent;
  let fixture: ComponentFixture<IdeePerUserModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeePerUserModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeePerUserModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
