import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutementComponent } from './Recrutement.component';

describe('RecrutementComponent', () => {
  let component: RecrutementComponent;
  let fixture: ComponentFixture<RecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
