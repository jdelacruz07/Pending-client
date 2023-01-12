import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPendingComponent } from './detail-pending.component';

describe('DetailPendingComponent', () => {
  let component: DetailPendingComponent;
  let fixture: ComponentFixture<DetailPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPendingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
