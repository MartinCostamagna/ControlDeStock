import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//service
import { ProductoService } from '../../services/producto.service';
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
    private ProductoService: ProductoService
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

    const productoConCantidad: ProductoConCantidad = {
      ...this.productoEncontrado,
      cantidadSale: Number(cantidadSale)
    };

    this.listaProductos.push(productoConCantidad);

    this.busquedaProductoForm.reset();
    this.inputsDatosForm.reset();
    this.productoEncontrado = null;
  }
}
