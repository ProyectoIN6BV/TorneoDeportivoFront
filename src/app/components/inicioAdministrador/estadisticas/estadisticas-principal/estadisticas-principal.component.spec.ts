import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPrincipalComponent } from './estadisticas-principal.component';

describe('EstadisticasPrincipalComponent', () => {
  let component: EstadisticasPrincipalComponent;
  let fixture: ComponentFixture<EstadisticasPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
