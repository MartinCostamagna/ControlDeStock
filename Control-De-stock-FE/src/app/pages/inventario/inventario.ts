import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {
  productos: Producto[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedProducto: Producto | null = null;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarInventario();
  }

  // Metodo para cargar productos
  cargarInventario(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar inventario:', err);
        this.errorMessage = 'No se pudo cargar el inventario desde el servidor.';
        this.isLoading = false;
      }
    });
  }

  // metodo para seleccionar productos
  onSelectProducto(producto: Producto): void {
    this.selectedProducto = producto;
  }
}
