import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserDataDialogComponent } from './change-user-data-dialog.component';

describe('ChangeUserDataDialogComponent', () => {
  let component: ChangeUserDataDialogComponent;
  let fixture: ComponentFixture<ChangeUserDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUserDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
