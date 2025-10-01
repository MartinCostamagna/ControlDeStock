import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSalidaProducto } from './registrar-salida-producto';

describe('RegistrarSalidaProducto', () => {
  let component: RegistrarSalidaProducto;
  let fixture: ComponentFixture<RegistrarSalidaProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSalidaProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSalidaProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
