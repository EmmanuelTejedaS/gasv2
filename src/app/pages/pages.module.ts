import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { CarritoComponent } from './carrito/carrito.component';
import { MispedidosComponent } from './mispedidos/mispedidos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { OptionmenuComponent } from './optionmenu/optionmenu.component';
import { PipaComponent } from './pipa/pipa.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    CarritoComponent,
    MispedidosComponent,
    PedidosComponent,
    OptionmenuComponent,
    PipaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule
  ]
})
export class PagesModule { }
