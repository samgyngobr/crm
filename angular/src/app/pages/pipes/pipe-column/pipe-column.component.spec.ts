import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeColumnComponent } from './pipe-column.component';

describe('PipeColumnComponent', () => {
  let component: PipeColumnComponent;
  let fixture: ComponentFixture<PipeColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
