import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../interfaces/proveedor.interface';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css'
})
export class Proveedores implements OnInit {
  proveedores: Proveedor[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedProveedor: Proveedor | null = null;

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  // Metodo para cargar proveedores
  cargarProveedores(): void {
    this.isLoading = true;
    this.proveedorService.obtenerProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        this.errorMessage = 'No se pudo cargar los proveedores desde el servidor.';
        this.isLoading = false;
      }
    });
  }

  // metodo para seleccionar proveedores
  onSelectProveedor(proveedor: Proveedor): void {
    this.selectedProveedor = proveedor;
  }
}
