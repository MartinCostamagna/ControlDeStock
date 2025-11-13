import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
// sevices
import { ProveedorService } from '../../services/proveedor.service';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { CiudadService } from '../../services/ciudad.service';
// interfaces
import { Pais } from '../../interfaces/pais.interface';
import { Provincia } from '../../interfaces/provincia.interface';
import { Ciudad } from '../../interfaces/ciudad.interface';
import { Proveedor } from '../../interfaces/proveedor.interface';

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-proveedor.html',
  styleUrl: './editar-proveedor.css'
})
export class EditarProveedor implements OnInit {
  // ID del proveedor que se está editando
  proveedorId!: number;
  proveedor!: Proveedor;
  //formulario registro proveedor
  proveedorForm!: FormGroup;
  // mensajes de exito y error
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // pais y provincias seleccionados para filtro
  selectedPaisId: number | null = null;
  selectedProvinciaId: number | null = null;
  // listas para objetos
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  ciudades: Ciudad[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    // inicializa el formulario edicion de proveedor
    this.proveedorForm = this.fb.group({
      idProveedor: [null],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCiudad: [{ value: null, disabled: true }, Validators.required],
    });

    // Carga paises
    this.paisService.obtenerPaises().subscribe({
      next: data => { this.paises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar países:', err)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID de proveedor no proporcionado.';
      return;
    }
    this.proveedorId = +id;

    this.cargarProveedor();
  }

  cargarProveedor(): void {
    this.proveedorService.obtenerProveedorPorId(this.proveedorId).pipe(
      switchMap(proveedor => {
        const idPais = proveedor.ciudad?.provincia?.pais?.idPais;
        const idProvincia = proveedor.ciudad?.provincia?.idProvincia;

        return forkJoin({
          proveedor: of(proveedor),
          paises: this.paisService.obtenerPaises(),
          provincias: this.provinciaService.obtenerPorPais(idPais),
          ciudades: this.ciudadService.obtenerPorProvincia(idProvincia)
        });

      }),
      tap(({ proveedor, paises, provincias, ciudades }) => {
        this.paises = paises;
        this.provincias = provincias;
        this.ciudades = ciudades;

        this.selectedPaisId = proveedor.ciudad?.provincia?.pais?.idPais || null;
        this.selectedProvinciaId = proveedor.ciudad?.provincia?.idProvincia || null;

        this.proveedorForm.patchValue({
          idProveedor: proveedor.idProveedor,
          nombre: proveedor.nombre,
          direccion: proveedor.direccion,
          telefono: proveedor.telefono,
          email: proveedor.email,
          idCiudad: proveedor.ciudad?.idCiudad || null,
        });

        if (this.selectedProvinciaId) {
          this.proveedorForm.get('idCiudad')!.enable();
        }
      }),

    ).subscribe();
  }

  // metodo para llamar las provincias de un pais
  onPaisChange(): void {
    const idPais: number | null = this.selectedPaisId;
    this.selectedProvinciaId = null;
    this.provincias = [];
    this.ciudades = [];
    this.proveedorForm.get('idCiudad')!.setValue(null);
    this.proveedorForm.get('idCiudad')!.disable();

    if (idPais) {
      this.provinciaService.obtenerPorPais(idPais).subscribe(data => {
        this.provincias = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      });
    }
  }

  // metodo para llamar las ciudades de una provincia
  onProvinciaChange(): void {
    const idProvincia: number | null = this.selectedProvinciaId;
    this.ciudades = [];
    this.proveedorForm.get('idCiudad')!.setValue(null);
    const ciudadControl = this.proveedorForm.get('idCiudad');

    if (idProvincia) {
      console.log(`Buscando ciudades para idProvincia: ${idProvincia}`);
      this.ciudadService.obtenerPorProvincia(idProvincia).subscribe(data => {
        this.ciudades = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      });
      ciudadControl!.enable();
    }
    else {
      ciudadControl!.disable();
    }
  }

  submitProveedor(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.proveedorForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const ProveedorEditado = this.proveedorForm.getRawValue();

    this.proveedorService.editarProveedor(this.proveedorId, ProveedorEditado).subscribe({
      next: (response) => {
        window.alert(`Edicion Exitosa: Proveedor "${response.nombre}" editado.`);
        this.router.navigate(['/proveedores']);
      },
      error: (err) => {
        console.error('Error al registrar proveedor:', err);
        this.errorMessage = `Error al registrar: ${err.error?.message || 'Error de conexión.'}`;
      }
    });
  }
}
