import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';
import { Producto } from '../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './venta.html',
  styleUrls: ['./venta.css']
})
export class Venta implements OnInit {
  busquedaProductoForm!: FormGroup;
  inputsDatosForm!: FormGroup;
  registroVentaForm!: FormGroup;

  productoEncontrado: Producto | null = null;
  listaProductos: any[] = [];
  totalVenta: number = 0;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    this.busquedaProductoForm = this.fb.group({
      codigoDeBarras: ['', Validators.required]
    });

    this.inputsDatosForm = this.fb.group({
      marca: [{ value: '', disabled: true }],
      categoria: [{ value: '', disabled: true }],
      descripcion: [{ value: '', disabled: true }],
      stock: [{ value: '', disabled: true }],
      proveedor: [{ value: '', disabled: true }],
      precioVenta: [{ value: '', disabled: true }],
      cantidad: ['', Validators.required]
    });

    this.registroVentaForm = this.fb.group({});
  }

  submitBusquedaProducto(): void {
    const codigo = this.busquedaProductoForm.get('codigoDeBarras')?.value;
    this.productoService.obtenerProductoPorId(codigo).subscribe({
      next: (prod) => {
        this.productoEncontrado = prod;
        const precioSugerido = prod.precioCosto * (1 + prod.porcentajeGanancia / 100);

        this.inputsDatosForm.patchValue({
          marca: prod.marca.nombre,
          categoria: prod.categoria.nombre,
          descripcion: prod.descripcion,
          stock: prod.stock,
          proveedor: prod.proveedor.nombre,
          precioVenta: precioSugerido.toFixed(2),
          cantidad: ''
        });
      },
      error: () => alert('Producto no encontrado')
    });
  }

  submitAgregarALista(): void {
    if (!this.productoEncontrado) return;

    const cantidad = Number(this.inputsDatosForm.get('cantidad')?.value);
    const precio = parseFloat(this.inputsDatosForm.get('precioVenta')?.value);

    if (cantidad > this.productoEncontrado.stock) {
      alert('Stock insuficiente para realizar la venta');
      return;
    }

    this.listaProductos.push({
      ...this.productoEncontrado,
      cantidadVenta: cantidad,
      precioVenta: precio,
      subtotal: precio * cantidad
    });

    this.totalVenta = this.listaProductos.reduce((acc, item) => acc + item.subtotal, 0);

    this.productoEncontrado = null;
    this.busquedaProductoForm.reset();
  }

  confirmarVenta(): void {
    const ventaDto = {
      detalles: this.listaProductos.map(item => ({
        codigoDeBarras: item.codigoDeBarras.toString(),
        cantidad: item.cantidadVenta,
        precioUnitario: item.precioVenta,
        subtotal: item.subtotal
      }))
    };

    this.ventaService.registrarVenta(ventaDto).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        alert('Venta registrada con éxito');
        this.listaProductos = [];
        this.totalVenta = 0;
        this.productoEncontrado = null;
        this.busquedaProductoForm.reset();
      },
      error: (err) => {
        if (err.status === 201 || err.status === 200) {
          alert('Venta registrada con éxito (pero el servidor respondió con texto)');
          this.listaProductos = [];
          this.totalVenta = 0;
        } else {
          const msg = err.error?.message || 'Error de conexión o stock insuficiente';
          alert('Error: ' + msg);
        }
      }
    });
  }
}