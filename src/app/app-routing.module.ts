import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';

import { canActivate } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { OptionmenuComponent } from './pages/optionmenu/optionmenu.component';
import { PipaComponent } from './pages/pipa/pipa.component';

const isAdmin = (next: any) => map( (user: any) => !!user && '187y100QW5TOVh9L0QrvNxhQq0E3' === user.uid);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'set-productos', component: SetProductosComponent, ...canActivate(isAdmin) },
  { path: 'perfil', component: PerfilComponent},
  { path: 'mis-pedidos', component: MispedidosComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'optionmenu', component: OptionmenuComponent},
  { path: 'pipa', component: PipaComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'perfil', pathMatch: 'full'},
{
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
