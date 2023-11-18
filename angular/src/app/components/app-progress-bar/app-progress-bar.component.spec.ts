import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProgressBarComponent } from './app-progress-bar.component';

describe('AppProgressBarComponent', () => {
  let component: AppProgressBarComponent;
  let fixture: ComponentFixture<AppProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppProgressBarComponent]
    });
    fixture = TestBed.createComponent(AppProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
