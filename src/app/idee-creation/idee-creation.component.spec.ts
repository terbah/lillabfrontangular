import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeeCreationComponent } from './idee-creation.component';

describe('IdeeCreationComponent', () => {
  let component: IdeeCreationComponent;
  let fixture: ComponentFixture<IdeeCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeeCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
