import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificacionService } from '../../services/notificacion.service';
import { Notificacion } from '../../interfaces/notificacion.interface';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificacionService = inject(NotificacionService);

  cantidadNotificaciones: number = 0;
  notificaciones: Notificacion[] = [];
  mostrarNotificaciones: boolean = false;

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    this.notificacionService.getNotificaciones().subscribe({
      next: (notis) => {
        this.notificaciones = notis;
        this.cantidadNotificaciones = notis.length;
      },
      error: (err) => console.error('Error al cargar notificaciones', err)
    });
  }

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

  marcarComoVista(id: number, event: Event): void {
    event.stopPropagation();
    this.notificacionService.marcarComoVista(id).subscribe(() => {
      this.cargarNotificaciones();
    });
  }

  eliminarNotificacion(id: number, event: Event): void {
    event.stopPropagation();
    this.notificacionService.eliminar(id).subscribe(() => {
      this.cargarNotificaciones();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
