import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerModalComponent } from './sneaker-modal.component';

describe('SneakerModalComponent', () => {
  let component: SneakerModalComponent;
  let fixture: ComponentFixture<SneakerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SneakerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
