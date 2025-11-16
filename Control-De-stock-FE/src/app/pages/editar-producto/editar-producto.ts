import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
//services
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { ProveedorService } from '../../services/proveedor.service';
//entities
import { Proveedor } from '../../interfaces/proveedor.interface';
import { Producto } from '../../interfaces/producto.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { Marca } from '../../interfaces/marca.interface';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {
  //formulario edicion producto
  productoForm!: FormGroup;
  // ID del producto que se está editando
  productoId: string | null = null;
  // mensajes de exito y error
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // listas para objetos
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    // inicializa el formulario edicion de producto
    this.productoForm = this.fb.group({
      codigoDeBarras: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioCosto: ['', [Validators.required, Validators.min(0)]],
      porcentajeGanancia: ['', [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
      stockMinimo: ['', [Validators.required, Validators.min(0)]],
      idMarca: [null, Validators.required],
      idCategoria: [null, Validators.required],
      idProveedor: [null, Validators.required],
    });

    this.cargarDatosIniciales();

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID de producto no proporcionado.';
      return;
    }
    this.productoId = id;

    this.cargarProducto();
  }

  // Contiene la lógica de las llamadas HTTP GET para cargar datos
  cargarDatosIniciales(): void {
    // Cargar Marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: data => { this.marcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar marcas:', err)
    });

    // Cargar Categorías
    this.categoriaService.obtenerCategorias().subscribe({
      next: data => { this.categorias = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar categorías:', err)
    });

    // Cargar Proveedores
    this.proveedorService.obtenerProveedores().subscribe({
      next: data => { this.proveedores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar proveedores:', err)
    });
  }

  cargarProducto(): void {
    this.productoService.obtenerProductoPorId(this.productoId!).pipe(
      tap(producto => {
        this.productoForm.patchValue({
          codigoDeBarras: producto.codigoDeBarras,
          descripcion: producto.descripcion,
          precioCosto: producto.precioCosto,
          porcentajeGanancia: producto.porcentajeGanancia,
          stock: producto.stock,
          stockMinimo: producto.stockMinimo,
          idMarca: producto.marca.idMarca,
          idCategoria: producto.categoria.idCategoria,
          idProveedor: producto.proveedor.idProveedor,
        })
      }
      )
    ).subscribe();
  }

  submitProductoEditado(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.productoForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const ProductoEditado = this.productoForm.getRawValue();

    this.productoService.editarProducto(this.productoId!, ProductoEditado).subscribe({
      next: (response) => {
        window.alert(`Edicion Exitosa: Producto "${response.descripcion}" editado.`);
        this.router.navigate(['/inventario']);
      },
      error: (err) => {
        console.error('Error al editar producto:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
  }
}
