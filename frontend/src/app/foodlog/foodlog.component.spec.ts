import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlogComponent } from './foodlog.component';

describe('FoodlogComponent', () => {
  let component: FoodlogComponent;
  let fixture: ComponentFixture<FoodlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
