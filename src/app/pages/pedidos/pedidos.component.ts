import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido, EstadoPedido } from '../../models';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, OnDestroy {

  nuevosSuscriber: Subscription;
  culmidadosSuscriber: Subscription;
  pedidos: Pedido[] = [];
  pedidosEntregados: Pedido[] = [];
  nuevos = true;
  estados: EstadoPedido[] = [ 'enviado', 'visto', 'camino', 'entregado'];

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public firebaseauthService: FirebaseauthService) { }

  ngOnInit() {
    this.getPedidosNuevos();
  }

  ngOnDestroy() {
    if (this.nuevosSuscriber) {
       this.nuevosSuscriber.unsubscribe();
    }
    if (this.culmidadosSuscriber) {
       this.culmidadosSuscriber.unsubscribe();
    }
 }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
    }


    changeSegment(ev: any) {
      //console.log('changeSegment()', ev.detail.value);
      const opc = ev.detail.value;
      if (opc === 'entregados') {
        this.nuevos = false;
        console.log('entregado');
      this.getPedidosEntregados();
      }
      if (opc === 'nuevos') {
        this.nuevos = true;
        console.log('nuevo ');
          this.getPedidosNuevos();
     }
   }

   async getPedidosNuevos(){
    console.log('getPedidosNuevos()');
    const path = 'pedidos';
    let startAt = null;
    if (this.pedidos.length) {
      startAt = this.pedidos[this.pedidos.length - 1].fecha;
  }
    this.nuevosSuscriber = this.firestoreService.getCollectionAll<Pedido>(path, 'estado', '==', 'enviado', startAt).subscribe( res =>  {
      if (res.length) {
        console.log('getPedidosNuevos() -> res ', res);
        res.forEach( pedido => {
          this.pedidos.push(pedido);
    });
  }
    });
   }

   async getPedidosEntregados(){
    console.log('getPedidosEntregados()');
    const path = 'pedidos';
    let startAt = null;
    if (this.pedidosEntregados.length) {
      startAt = this.pedidosEntregados[this.pedidosEntregados.length - 1].fecha;
  }
    this.nuevosSuscriber = this.firestoreService.getCollectionAll<Pedido>(path, 'estado', '==', 'entregado', startAt).subscribe( res =>  {
      if (res.length) {
        console.log('getPedidosEntregados() -> res ', res);
        res.forEach( pedido => {
          this.pedidosEntregados.push(pedido);
    });
  }
    });
   }

   cargarMas(){
    if (this.nuevos) {
     this.getPedidosNuevos();
   } else {
     this.getPedidosEntregados();
   }
  }

}
