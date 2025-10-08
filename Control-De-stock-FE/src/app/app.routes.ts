import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from '../app/pages/login/login';
import { Inicio } from '../app/pages/inicio/inicio';
import { RegistrarProducto } from './pages/registrar-producto/registrar-producto';
import { RegistrarSalidaProducto } from './pages/registrar-salida-producto/registrar-salida-producto';
import { RegistrarIngresoProducto } from './pages/registrar-ingreso-producto/registrar-ingreso-producto';
import { Inventario } from './pages/inventario/inventario';
import { Proveedores } from './pages/proveedores/proveedores';
import { Pedidos } from './pages/pedidos/pedidos';

export const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'login', component: Login},
  { path: 'inicio', component: Inicio},
  { path: 'registrarProducto', component: RegistrarProducto},
  { path: 'registrarSalidaDeProducto', component: RegistrarSalidaProducto},
  { path: 'registrarIngresoDeProducto', component: RegistrarIngresoProducto},
  { path: 'inventario', component: Inventario},
  { path: 'proveedores', component: Proveedores},
  { path: 'pedidos', component: Pedidos},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }