import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionstockComponent } from './gestionstock.component';

describe('GestionstockComponent', () => {
  let component: GestionstockComponent;
  let fixture: ComponentFixture<GestionstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionstockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
