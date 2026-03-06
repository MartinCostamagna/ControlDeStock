import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//service
import { ProductoService } from '../../services/producto.service';
import { EntradaService } from '../../services/entrada.service';
//interfaces
import { Producto } from '../../interfaces/producto.interface';

interface ProductoConCantidad extends Producto {
  cantidadIngresa: number;
}

@Component({
  selector: 'app-registrar-ingreso-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-ingreso-producto.html',
  styleUrl: './registrar-ingreso-producto.css'
})

export class RegistrarIngresoProducto implements OnInit {
  //formulario de busqueda de producto
  busquedaProductoForm!: FormGroup;
  //formulario inputs muestra de datos
  inputsDatosForm!: FormGroup;
  //formulario de registro de ingreso de producto
  registroIngresoForm!: FormGroup;
  //producto encontrado
  productoEncontrado!: Producto | null;
  //codigo de barras ingresado
  codigoDeBarras!: string;
  // Lista de productos
  listaProductos: ProductoConCantidad[] = [];

  constructor(
    private fb: FormBuilder,
    private ProductoService: ProductoService,
    private entradaService: EntradaService
  ) { }

  ngOnInit(): void {
    this.busquedaProductoForm = this.fb.group({
      codigoDeBarras: ['']
    });

    this.inputsDatosForm = this.fb.group({
      marca: [{ value: null, disabled: true }],
      categoria: [{ value: null, disabled: true }],
      descripcion: [{ value: '', disabled: true }],
      stock: [{ value: null, disabled: true }],
      proveedor: [{ value: '', disabled: true }],
      cantidad: [''],
    })
  }

  submitBusquedaProducto(): void {
    this.codigoDeBarras = this.busquedaProductoForm.get('codigoDeBarras')?.value;
    this.ProductoService.obtenerProductoPorId(this.codigoDeBarras).subscribe(producto => {
      this.productoEncontrado = producto;
      this.inputsDatosForm.patchValue({
        marca: this.productoEncontrado?.marca.nombre,
        categoria: this.productoEncontrado?.categoria.nombre,
        descripcion: this.productoEncontrado?.descripcion,
        stock: this.productoEncontrado?.stock,
        proveedor: this.productoEncontrado?.proveedor.nombre,
      });
    });
  }

  submitAgregarALista(): void {
    const cantidadIngresa = this.inputsDatosForm.get('cantidad')?.value;

    if (!this.productoEncontrado || this.inputsDatosForm.invalid || cantidadIngresa <= 0) {
      console.error('Error: Producto no encontrado o cantidad inválida.');
      return;
    }

    const productoConCantidad: ProductoConCantidad = {
      ...this.productoEncontrado,
      cantidadIngresa: Number(cantidadIngresa)
    };

    this.listaProductos.push(productoConCantidad);

    this.busquedaProductoForm.reset();
    this.inputsDatosForm.reset();
    this.productoEncontrado = null;
  }

  submitConfirmar(): void {
    if (this.listaProductos.length === 0) {
      alert('La lista de productos está vacía.');
      return;
    }

    const payload = {
      detalles: this.listaProductos.map(p => ({
        codigoDeBarras: p.codigoDeBarras,
        cantidad: p.cantidadIngresa
      }))
    };

    this.entradaService.registrarIngreso(payload).subscribe({
      next: (res) => {
        alert('Ingreso registrado con éxito y stock actualizado.');
        this.listaProductos = [];
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el ingreso: ' + (err.error?.message || 'Error del servidor'));
      }
    });
  }
}
