import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeDetailsComponent } from './pipe-details.component';

describe('PipeDetailsComponent', () => {
  let component: PipeDetailsComponent;
  let fixture: ComponentFixture<PipeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeDetailsComponent]
    });
    fixture = TestBed.createComponent(PipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
