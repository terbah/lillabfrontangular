import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCreationComponent } from './projet-creation.component';

describe('ProjetCreationComponent', () => {
  let component: ProjetCreationComponent;
  let fixture: ComponentFixture<ProjetCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
