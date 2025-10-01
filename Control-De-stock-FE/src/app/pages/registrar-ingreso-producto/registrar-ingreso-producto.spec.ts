import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIngresoProducto } from './registrar-ingreso-producto';

describe('RegistrarIngresoProducto', () => {
  let component: RegistrarIngresoProducto;
  let fixture: ComponentFixture<RegistrarIngresoProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarIngresoProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarIngresoProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
