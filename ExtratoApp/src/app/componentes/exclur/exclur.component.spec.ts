import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclurComponent } from './exclur.component';

describe('ExclurComponent', () => {
  let component: ExclurComponent;
  let fixture: ComponentFixture<ExclurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExclurComponent]
    });
    fixture = TestBed.createComponent(ExclurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
