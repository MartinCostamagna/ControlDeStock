import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './registrar-producto.html',
  styleUrl: './registrar-producto.css'
})
export class RegistrarProducto {
  RegistrarMarca = false
  
  registrarMarca(): void {
    this.RegistrarMarca = !this.RegistrarMarca
  }

  RegistrarProveedor = false
  
  registrarProveedor(): void {
    this.RegistrarProveedor = !this.RegistrarProveedor
  }

}
