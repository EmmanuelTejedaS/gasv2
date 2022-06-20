/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from '../../models';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private path = 'productos/';
  productos: Producto[] = [];
  idUsuario = '';

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService) {
                this.loadProductos();
               }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }


  loadProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(   res => {
      this.productos = res;
      console.log('productos', res);
    });
}

}
