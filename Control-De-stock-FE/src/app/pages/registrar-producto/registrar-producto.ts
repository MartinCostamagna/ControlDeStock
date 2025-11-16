import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
// sevices
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProveedorService } from '../../services/proveedor.service';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { ProductoService } from '../../services/producto.service';
import { CiudadService } from '../../services/ciudad.service';
// interfaces
import { Marca } from '../../interfaces/marca.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { Pais } from '../../interfaces/pais.interface';
import { Provincia } from '../../interfaces/provincia.interface';
import { Ciudad } from '../../interfaces/ciudad.interface';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-producto.html',
  styleUrl: './registrar-producto.css'
})
export class RegistrarProducto implements OnInit {
  //formulario registro producto
  productoForm!: FormGroup;
  //formulario registro marca
  marcaForm!: FormGroup;
  // Control para la entrada de texto del autocomplete de Marca
  marcaSearchControl = new FormControl('');
  //formulario registro categoria
  categoriaForm!: FormGroup;
  //formulario registro proveedor
  proveedorForm!: FormGroup;
  // mensajes de exito y error
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // pais y provincias seleccionados para filtro
  selectedPaisId: number | null = null;
  selectedProvinciaId: number | null = null;
  // listas para objetos
  marcas: Marca[] = [];
  filteredMarcas: Marca[] = [];
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  ciudades: Ciudad[] = [];
  showMarcaDropdown: boolean = false;

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    // inicializa el formulario registro producto
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

    //carga datos a selects
    this.cargarDatosIniciales();

    // inicializa el formulario registro marca
    this.marcaForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    // Suscribe a los cambios del input de búsqueda de marca
    this.marcaSearchControl.valueChanges.subscribe(value => {
      this.filterMarcas(value);
    });

    // inicializa el formulario registro categoria
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    // inicializa el formulario registro proveedor
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCiudad: [{ value: null, disabled: true }, Validators.required]
    });
  }

  // Contiene la lógica de las llamadas HTTP GET para cargar datos
  cargarDatosIniciales(): void {
    // Cargar Marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: data => { this.filteredMarcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
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

    // Cargar Paises
    this.paisService.obtenerPaises().subscribe({
      next: data => { this.paises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar países:', err)
    });
  }

  // metodos parra mostrar registro de marcas, categorias y proveedores
  RegistrarMarca = false
  registrarMarca(): void {
    this.RegistrarMarca = !this.RegistrarMarca
  }

  RegistrarCategoria = false
  registrarCategoria(): void {
    this.RegistrarCategoria = !this.RegistrarCategoria
  }

  RegistrarProveedor = false
  registrarProveedor(): void {

    this.RegistrarProveedor = !this.RegistrarProveedor
  }

  // metodo para llamar las provincias de un pais
  onPaisChange(idPais: number | null): void {
    this.selectedProvinciaId = null;
    this.provincias = [];
    this.ciudades = [];
    this.proveedorForm.get('idCiudad')!.setValue(null);

    if (idPais) {
      this.provinciaService.obtenerPorPais(idPais).subscribe(data => {
        this.provincias = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      });
    }
  }

  // metodo para llamar las ciudades de una provincia
  onProvinciaChange(idProvincia: number | null): void {
    this.ciudades = [];
    this.proveedorForm.get('idCiudad')!.setValue(null);
    const ciudadControl = this.proveedorForm.get('idCiudad');

    if (idProvincia) {
      this.ciudadService.obtenerPorProvincia(idProvincia).subscribe(data => {
        this.ciudades = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      });
      ciudadControl!.enable();
    }
    else {
      ciudadControl!.disable();
    }
  }

  // Metodo para registrar una nueva marca
  submitMarca(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.marcaForm.invalid) {
      this.errorMessage = 'El nombre de la marca es obligatorio.';
      return;
    }

    const nuevaMarca = this.marcaForm.value;

    this.marcaService.registrarMarca(nuevaMarca).subscribe({
      next: (response) => {
        window.alert(`Registro Exitoso: Marca "${response.nombre}" creada.`);
        console.log('Marca registrada:', response);
        this.cargarDatosIniciales();
        this.marcaForm.reset();
        this.RegistrarMarca = false;
      },
      error: (err) => {
        console.error('Error al registrar marca:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
  }

  // Metodo para registrar una nueva categoria
  submitCategoria(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.categoriaForm.invalid) {
      this.errorMessage = 'El nombre de la categoría es obligatorio.';
      return;
    }

    const nuevaCategoria = this.categoriaForm.value;

    this.categoriaService.registrarCategoria(nuevaCategoria).subscribe({
      next: (response) => {
        window.alert(`Registro Exitoso: Categoría "${response.nombre}" creada.`);
        this.cargarDatosIniciales();
        this.categoriaForm.reset();
        this.RegistrarCategoria = false;
      },
      error: (err) => {
        console.error('Error al registrar categoría:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
  }

  // Metodo para registrar un nuevo proveedor
  submitProveedor(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.proveedorForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const nuevoProveedor = this.proveedorForm.value;

    this.proveedorService.registrarProveedor(nuevoProveedor).subscribe({
      next: (response) => {
        window.alert(`Registro Exitoso: Proveedor "${response.nombre}" creado.`);
        this.cargarDatosIniciales();
        this.proveedorForm.reset();
        this.RegistrarProveedor = false;
      },
      error: (err) => {
        console.error('Error al registrar proveedor:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
    this.selectedPaisId = null;
    this.selectedProvinciaId = null;
    this.proveedorForm.reset({
      idCiudad: { value: null, disabled: true }
    });
  }

  submitProducto(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.productoForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos del formulario de producto.';
      return;
    }

    const nuevoProducto = this.productoForm.value;
    this.productoService.registrarProducto(nuevoProducto).subscribe({
      next: (response) => {
        window.alert(`Registro Exitoso: Producto "${response.descripcion}" creado.`);
        this.productoForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar producto:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
  }

  filterMarcas(searchText: string | null): void {
    const lowerCaseSearch = (searchText || '').toLowerCase();
    if (!lowerCaseSearch) {
      this.filteredMarcas = this.marcas;
    } else {
      this.filteredMarcas = this.marcas.filter(marca =>
        marca.nombre.toLowerCase().includes(lowerCaseSearch)
      );
    }
    this.showMarcaDropdown = true;
  }

  selectMarca(marca: Marca): void {
    this.marcaSearchControl.setValue(marca.nombre, { emitEvent: false });
    this.productoForm.get('idMarca')!.setValue(marca.idMarca);
    this.showMarcaDropdown = false;
    this.productoForm.get('idMarca')!.markAsTouched();
  }

  onMarcaBlur(): void {
    setTimeout(() => {
      this.showMarcaDropdown = false;
      const selectedId = this.productoForm.get('idMarca')!.value;
      const currentName = this.marcaSearchControl.value;

      if (selectedId) {
        const actualMarca = this.marcas.find(m => m.idMarca === selectedId);
        if (actualMarca && actualMarca.nombre !== currentName) {
          this.marcaSearchControl.setValue(actualMarca.nombre, { emitEvent: false });
        }
      } else if (currentName && currentName.trim() !== '') {
        // Si hay texto pero no hay ID seleccionado (no se seleccionó de la lista)
        // Borra el texto para forzar la selección o el vacío
        this.marcaSearchControl.setValue(null, { emitEvent: false });
        // Y el ID debe estar en null
        this.productoForm.get('idMarca')!.setValue(null);
        this.productoForm.get('idMarca')!.markAsTouched();
      }
    }, 200); // 200ms de retraso
  }
}
