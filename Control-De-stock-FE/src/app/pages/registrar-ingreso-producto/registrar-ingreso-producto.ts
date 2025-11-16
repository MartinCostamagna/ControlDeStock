import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
//service
import { ProductoService } from '../../services/producto.service';
//interfaces
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-registrar-ingreso-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './registrar-ingreso-producto.html',
  styleUrl: './registrar-ingreso-producto.css'
})
export class RegistrarIngresoProducto implements OnInit {
  //formulario de busqueda de producto
  busquedaProductoForm!: FormGroup;
  //formulario de registro de ingreso de producto
  registroIngresoForm!: FormGroup;
  //producto encontrado
  productoEncontrado!: Producto | null;
  //codigo de barras ingresado
  codigoDeBarras!: string;

  constructor(
    private fb: FormBuilder,
    private ProductoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.busquedaProductoForm = this.fb.group({
      codigoDeBarras: ['']
    });
  }

  submitBusquedaProducto(): void {
    this.codigoDeBarras = this.busquedaProductoForm.get('codigoDeBarras')?.value;
    this.ProductoService.obtenerProductoPorId(this.codigoDeBarras).subscribe(producto => {
      this.productoEncontrado = producto;
    });


  }
}
