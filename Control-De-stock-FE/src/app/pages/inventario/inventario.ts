import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Producto } from '../../interfaces/producto.interface';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {
  productosOriginales: Producto[] = [];
  productos: Producto[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedProducto: Producto | null = null;

  // Variables de Filtro
  filtroCodigo: string = '';
  marcaSearchControl = new FormControl('');
  categoriaSearchControl = new FormControl('');
  proveedorSearchControl = new FormControl('');

  // Listas para Selects
  marcas: any[] = [];
  filteredMarcas: any[] = [];
  categorias: any[] = [];
  filteredCategorias: any[] = [];
  proveedores: any[] = [];
  filteredProveedores: any[] = [];

  showMarcaDropdown = false;
  showCategoriaDropdown = false;
  showProveedorDropdown = false;

  constructor(
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.cargarInventario();
    this.cargarCatalogos();
    this.configurarFiltros();
  }

  // Metodo para cargar productos
  cargarInventario(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productosOriginales = data;
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

  cargarCatalogos(): void {
    this.marcaService.obtenerMarcas().subscribe(data => {
      this.marcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
    this.proveedorService.obtenerProveedores().subscribe(data => {
      this.proveedores = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  configurarFiltros(): void {
    // Escuchar cambios en cada control y aplicar filtros
    this.marcaSearchControl.valueChanges.subscribe(val => {
      const search = val?.toLowerCase() || '';
      this.filteredMarcas = this.marcas.filter(m => m.nombre.toLowerCase().includes(search));
      this.aplicarFiltros();
    });

    this.categoriaSearchControl.valueChanges.subscribe(val => {
      const search = val?.toLowerCase() || '';
      this.filteredCategorias = this.categorias.filter(c => c.nombre.toLowerCase().includes(search));
      this.aplicarFiltros();
    });

    this.proveedorSearchControl.valueChanges.subscribe(val => {
      const search = val?.toLowerCase() || '';
      this.filteredProveedores = this.proveedores.filter(p => p.nombre.toLowerCase().includes(search));
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    const cod = this.filtroCodigo.toLowerCase();
    const mar = this.marcaSearchControl.value?.toLowerCase() || '';
    const cat = this.categoriaSearchControl.value?.toLowerCase() || '';
    const prov = this.proveedorSearchControl.value?.toLowerCase() || '';

    this.productos = this.productosOriginales.filter(p => {
      const matchCod = p.codigoDeBarras.toString().includes(cod);
      const matchMar = p.marca.nombre.toLowerCase().includes(mar);
      const matchCat = p.categoria.nombre.toLowerCase().includes(cat);
      const matchProv = p.proveedor.nombre.toLowerCase().includes(prov);
      return matchCod && matchMar && matchCat && matchProv;
    });
  }

  selectItem(item: any, tipo: string): void {
    if (tipo === 'marca') {
      this.marcaSearchControl.setValue(item.nombre, { emitEvent: true });
      this.showMarcaDropdown = false;
    } else if (tipo === 'categoria') {
      this.categoriaSearchControl.setValue(item.nombre, { emitEvent: true });
      this.showCategoriaDropdown = false;
    } else if (tipo === 'proveedor') {
      this.proveedorSearchControl.setValue(item.nombre, { emitEvent: true });
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

  onFocus(tipo: string): void {
    if (tipo === 'marca') {
      this.showMarcaDropdown = true;
      this.filteredMarcas = this.marcas;
    }
    if (tipo === 'categoria') {
      this.showCategoriaDropdown = true;
      this.filteredCategorias = this.categorias;
    }
    if (tipo === 'proveedor') {
      this.showProveedorDropdown = true;
      this.filteredProveedores = this.proveedores;
    }
  }

  // metodo para seleccionar productos
  onSelectProducto(producto: Producto): void {
    this.selectedProducto = producto;
  }
}
