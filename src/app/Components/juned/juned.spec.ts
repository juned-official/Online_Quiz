import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Juned } from './juned';

describe('Juned', () => {
  let component: Juned;
  let fixture: ComponentFixture<Juned>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Juned]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Juned);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
