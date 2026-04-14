import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { RegistrarProducto } from './pages/registrar-producto/registrar-producto';
import { RegistrarSalidaProducto } from './pages/registrar-salida-producto/registrar-salida-producto';
import { RegistrarIngresoProducto } from './pages/registrar-ingreso-producto/registrar-ingreso-producto';
import { Inventario } from './pages/inventario/inventario';
import { Proveedores } from './pages/proveedores/proveedores';
import { Pedidos } from './pages/pedidos/pedidos';
import { EditarProveedor } from './pages/editar-proveedor/editar-proveedor';
import { EditarProducto } from './pages/editar-producto/editar-producto';
import { Venta } from './pages/venta/venta';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },

{ path: 'inicio', component: Inicio, canActivate: [authGuard] },
{ path: 'registrarProducto', component: RegistrarProducto, canActivate: [authGuard] },
{ path: 'registrarSalidaDeProducto', component: RegistrarSalidaProducto, canActivate: [authGuard] },
{ path: 'registrarIngresoDeProducto', component: RegistrarIngresoProducto, canActivate: [authGuard] },
{ path: 'inventario', component: Inventario, canActivate: [authGuard] },
{ path: 'proveedores', component: Proveedores, canActivate: [authGuard] },
{ path: 'pedidos', component: Pedidos, canActivate: [authGuard] },
{ path: 'editarProveedor/:id', component: EditarProveedor, canActivate: [authGuard] },
{ path: 'editarProducto/:id', component: EditarProducto, canActivate: [authGuard] },
{ path: 'venta', component: Venta, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }