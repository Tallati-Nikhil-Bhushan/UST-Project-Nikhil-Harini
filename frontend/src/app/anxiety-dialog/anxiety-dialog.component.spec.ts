import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyDialogComponent } from './anxiety-dialog.component';

describe('AnxietyDialogComponent', () => {
  let component: AnxietyDialogComponent;
  let fixture: ComponentFixture<AnxietyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnxietyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnxietyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
