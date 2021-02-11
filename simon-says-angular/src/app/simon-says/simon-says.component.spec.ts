import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonSaysComponent } from './simon-says.component';

describe('SimonSaysComponent', () => {
  let component: SimonSaysComponent;
  let fixture: ComponentFixture<SimonSaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimonSaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimonSaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
