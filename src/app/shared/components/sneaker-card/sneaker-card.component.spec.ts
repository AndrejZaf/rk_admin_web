import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerCardComponent } from './sneaker-card.component';

describe('SneakerCardComponent', () => {
  let component: SneakerCardComponent;
  let fixture: ComponentFixture<SneakerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SneakerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
