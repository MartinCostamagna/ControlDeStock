import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { filter, switchMap, tap, of } from 'rxjs';
//service
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
//interface
import { Proveedor } from '../../interfaces/proveedor.interface';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {
  //formulario selector proveedor
  busquedaProveedorForm!: FormGroup;
  // listas de proveedores y productos
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.busquedaProveedorForm = this.fb.group({
      idProveedor: [null, Validators.required],
    })

    // Cargar Proveedores
    this.proveedorService.obtenerProveedores().subscribe({
      next: data => { this.proveedores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar proveedores:', err)
    });

    this.OnProveedorChange();
  }

  OnProveedorChange(): void {
    const proveedorControl = this.busquedaProveedorForm.get('idProveedor');

    proveedorControl!.valueChanges.pipe(
      tap(() => {
        this.productos = [];
      }),
      switchMap((idProveedor: number | null) => {
        if (!idProveedor) {
          return of([]);
        }
        return this.productoService.obtenerPorProveedor(idProveedor);
      })
    ).subscribe({
      next: (productosFiltrados: Producto[]) => {
        this.productos = productosFiltrados.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion)
        );
      },
      error: (err) => console.error('Error al cargar productos por proveedor:', err)
    });
    console.log(this.productos)
  }
}
