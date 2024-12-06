import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionfournisseurComponent } from './gestionfournisseur.component';

describe('GestionfournisseurComponent', () => {
  let component: GestionfournisseurComponent;
  let fixture: ComponentFixture<GestionfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionfournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
