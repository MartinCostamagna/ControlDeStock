import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//service
import { ProductoService } from '../../services/producto.service';
import { SalidaService } from '../../services/salida.service';
//interfaces
import { Producto } from '../../interfaces/producto.interface';

interface ProductoConCantidad extends Producto {
  cantidadSale: number;
}

@Component({
  selector: 'app-registrar-salida-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-salida-producto.html',
  styleUrl: './registrar-salida-producto.css'
})

export class RegistrarSalidaProducto implements OnInit {
  //formulario de busqueda de producto
  busquedaProductoForm!: FormGroup;
  //formulario inputs muestra de datos
  inputsDatosForm!: FormGroup;
  //formulario de registro de ingreso de producto
  registroSalidaForm!: FormGroup;
  //producto encontrado
  productoEncontrado!: Producto | null;
  //codigo de barras ingresado
  codigoDeBarras!: string;
  // Lista de productos
  listaProductos: ProductoConCantidad[] = [];

  constructor(
    private fb: FormBuilder,
    private ProductoService: ProductoService,
    private salidaService: SalidaService
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
    const cantidadSale = this.inputsDatosForm.get('cantidad')?.value;

    if (!this.productoEncontrado || this.inputsDatosForm.invalid || cantidadSale <= 0) {
      console.error('Error: Producto no encontrado o cantidad inválida.');
      return;
    }

    if (cantidadSale > this.productoEncontrado.stock) {
      alert(`No puedes retirar ${cantidadSale} unidades. El stock actual es de ${this.productoEncontrado.stock}.`);
      return;
    }

    const productoConCantidad: ProductoConCantidad = {
      ...this.productoEncontrado,
      cantidadSale: Number(cantidadSale)
    };

    this.listaProductos.push(productoConCantidad);

    this.busquedaProductoForm.reset();
    this.inputsDatosForm.reset();
    this.productoEncontrado = null;
  }

  submitConfirmar(): void {
    const motivoSelect = document.getElementById('descripcion') as HTMLSelectElement;
    const motivo = motivoSelect.value;

    if (motivo === 'Seleccione una opcion') {
      alert('Por favor, seleccione un motivo para la salida.');
      return;
    }

    if (this.listaProductos.length === 0) {
      alert('La lista de productos está vacía.');
      return;
    }

    const payload = {
      motivo: motivo,
      detalles: this.listaProductos.map(p => ({
        codigoDeBarras: p.codigoDeBarras,
        cantidad: p.cantidadSale
      }))
    };

    this.salidaService.registrarSalida(payload).subscribe({
      next: () => {
        alert('Salida registrada con éxito. El stock ha sido actualizado.');
        this.listaProductos = [];
        motivoSelect.value = 'Seleccione una opcion';
      },
      error: (err) => {
        alert('Error: ' + (err.error?.message || 'No se pudo registrar la salida'));
      }
    });
  }
}
