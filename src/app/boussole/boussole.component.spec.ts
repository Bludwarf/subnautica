import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoussoleComponent } from './boussole.component';

describe('BoussoleComponent', () => {
  let component: BoussoleComponent;
  let fixture: ComponentFixture<BoussoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoussoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoussoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
