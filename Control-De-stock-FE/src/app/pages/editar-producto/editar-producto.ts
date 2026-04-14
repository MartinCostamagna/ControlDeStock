import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
//services
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { ProveedorService } from '../../services/proveedor.service';
//entities
import { Proveedor } from '../../interfaces/proveedor.interface';
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
  marcaSearchControl = new FormControl('');
  categoriaSearchControl = new FormControl('');
  proveedorSearchControl = new FormControl('');

  // Listas
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  proveedores: Proveedor[] = [];

  // Listas Filtradas
  filteredMarcas: Marca[] = [];
  filteredCategorias: Categoria[] = [];
  filteredProveedores: Proveedor[] = [];

  // Visibilidad de Dropdowns
  showMarcaDropdown = false;
  showCategoriaDropdown = false;
  showProveedorDropdown = false;

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

    // Suscripciones a los cambios de búsqueda
    this.marcaSearchControl.valueChanges.subscribe(val => this.filterData(val, 'marca'));
    this.categoriaSearchControl.valueChanges.subscribe(val => this.filterData(val, 'categoria'));
    this.proveedorSearchControl.valueChanges.subscribe(val => this.filterData(val, 'proveedor'));
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
    this.productoService.obtenerProductoPorId(this.productoId!).subscribe(producto => {
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
      });

      this.marcaSearchControl.setValue(producto.marca.nombre, { emitEvent: false });
      this.categoriaSearchControl.setValue(producto.categoria.nombre, { emitEvent: false });
      this.proveedorSearchControl.setValue(producto.proveedor.nombre, { emitEvent: false });
    });
  }

  filterData(val: string | null, tipo: 'marca' | 'categoria' | 'proveedor'): void {
    const search = (val || '').toLowerCase();
    if (tipo === 'marca') {
      this.filteredMarcas = this.marcas.filter(m => m.nombre.toLowerCase().includes(search));
      this.showMarcaDropdown = true;
    } else if (tipo === 'categoria') {
      this.filteredCategorias = this.categorias.filter(c => c.nombre.toLowerCase().includes(search));
      this.showCategoriaDropdown = true;
    } else if (tipo === 'proveedor') {
      this.filteredProveedores = this.proveedores.filter(p => p.nombre.toLowerCase().includes(search));
      this.showProveedorDropdown = true;
    }
  }

  selectItem(item: any, tipo: 'marca' | 'categoria' | 'proveedor'): void {
    if (tipo === 'marca') {
      this.marcaSearchControl.setValue(item.nombre, { emitEvent: false });
      this.productoForm.get('idMarca')?.setValue(item.idMarca);
      this.showMarcaDropdown = false;
    } else if (tipo === 'categoria') {
      this.categoriaSearchControl.setValue(item.nombre, { emitEvent: false });
      this.productoForm.get('idCategoria')?.setValue(item.idCategoria);
      this.showCategoriaDropdown = false;
    } else if (tipo === 'proveedor') {
      this.proveedorSearchControl.setValue(item.nombre, { emitEvent: false });
      this.productoForm.get('idProveedor')?.setValue(item.idProveedor);
      this.showProveedorDropdown = false;
    }
  }

  onBlur(tipo: string): void {
    setTimeout(() => {
      if (tipo === 'marca') this.showMarcaDropdown = false;
      if (tipo === 'categoria') this.showCategoriaDropdown = false;
      if (tipo === 'proveedor') this.showProveedorDropdown = false;
    }, 200);
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
