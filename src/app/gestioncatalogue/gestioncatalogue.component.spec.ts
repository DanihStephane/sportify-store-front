import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncatalogueComponent } from './gestioncatalogue.component';

describe('GestioncatalogueComponent', () => {
  let component: GestioncatalogueComponent;
  let fixture: ComponentFixture<GestioncatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioncatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioncatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
