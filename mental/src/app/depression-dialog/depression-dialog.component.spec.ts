import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepressionDialogComponent } from './depression-dialog.component';

describe('DepressionDialogComponent', () => {
  let component: DepressionDialogComponent;
  let fixture: ComponentFixture<DepressionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepressionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepressionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
