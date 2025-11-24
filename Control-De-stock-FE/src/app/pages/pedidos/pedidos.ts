import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { switchMap, tap, of } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  proveedorSeleccionado: Proveedor | null = null;
  productos: Producto[] = [];
  productosSeleccionados: Producto[] = [];
  cantidades: { [codigo: string]: number } = {};

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
        this.proveedorSeleccionado = null;
      }),
      switchMap((idProveedor: number | null) => {
        if (!idProveedor) {
          return of([]);
        }
        const proveedorObjeto = this.proveedores.find(p => p.idProveedor === idProveedor) || null;
        this.proveedorSeleccionado = proveedorObjeto;
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
  }

  onSelectProducto(prod: Producto, checked: boolean): void {
    if (checked) {
      if (!this.productosSeleccionados.includes(prod)) {
        this.productosSeleccionados.push(prod);
      }
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(p => p !== prod);
      delete this.cantidades[prod.codigoDeBarras];
    }
  }

  generarPDF(): void {
    if (this.productosSeleccionados.length === 0) {
      window.alert('Debe seleccionar al menos un producto para el pedido.');
      return;
    }

    const nombreProveedor = this.proveedorSeleccionado?.nombre || 'Desconocido';
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();

    const fechaFormato = `${dia}-${mes}-${anio}`;
    const nombreArchivo = `Pedido_${nombreProveedor.replace(/\s/g, '')}_${fechaFormato}.pdf`;

    const datosTabla = this.productosSeleccionados.map(prod => {
      const cantidadAPedir = this.cantidades[prod.codigoDeBarras] || 0;

      if (cantidadAPedir <= 0) {
        throw new Error(`La cantidad a pedir para ${prod.descripcion} debe ser mayor a cero.`);
      }

      return [
        prod.codigoDeBarras,
        prod.marca.nombre,
        prod.descripcion,
        cantidadAPedir
      ];
    });

    const doc = new jsPDF();

    doc.setFontSize(18).text('Listado de Pedido a Proveedor', 14, 22);
    autoTable(doc, {
      startY: 40,
      head: [['Código', 'Marca', 'Descripción', 'Cantidad a Pedir']],
      body: datosTabla,
      theme: 'striped',
      headStyles: { fillColor: [255, 158, 1] }
    });

    doc.save(nombreArchivo);
  }
}
