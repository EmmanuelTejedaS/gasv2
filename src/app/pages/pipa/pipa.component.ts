import { Component, Input, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pipa, Cliente, Producto } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-pipa',
  templateUrl: './pipa.component.html',
  styleUrls: ['./pipa.component.scss'],
})
export class PipaComponent implements OnInit {

  @Input() pipaInterface: Pipa;
  interface: PipaVal;
  producto: PipaVal2;
  pipaSuscriber: Subscription;
  lt: number;
  dineroC: number;
  n: number;
  cliente: Cliente;
  pipa: Pipa;
  pipas: Pipa[] = [];
  interfacepipa: PipaCard;
  selectedOption: number;
  selectedOptionDinero: number;
  totalDinero: number;
  totalLitros: number;
  idUsuario = '';
  dineroEnable = false;
  litrosEnable = false;
  pipaNombre = '';
  pipaId = '';
  pipaFoto = '';

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              private firebaseauthService: FirebaseauthService,
              public carritoService: CarritoService,
              public alertController: AlertController) {
    // this.initCardPipa();

  }

  ngOnInit() {
    this.initCardPipa();
    this.getUid();
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  getUid() {
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
            this.idUsuario = res.uid;
            console.log('iid user', this.idUsuario);
          } else {
            console.log('usuario');
          }
    });
  }

initCardPipa(){
  const path = 'pipa';
  const id = 'ezQ1jJwYrf8hKNaNztC6';
  this.firestoreService.getDoc<PipaCard>(path,id).subscribe( res =>{
    console.log('respuesta', res);
    console.log('nombre', res.nombre);
    console.log('id', res.id);
    console.log('ltr', res.precioLitro);
    console.log('foto', res.foto);
    console.log('fecha', res.fecha);

    this.n = res.precioLitro;
    this.pipaNombre = res.nombre;
    this.pipaId = res.id;
    this.pipaFoto = res.foto;

  });
}

ionChange(){
  console.log(this.selectedOption);
  this.lt = this.selectedOption;
  this.totalDinero = this.lt * this.n;
  console.log(this.totalDinero);
}

ionChangeDinero(){
  console.log(this.selectedOptionDinero);
  this.dineroC = this.selectedOptionDinero;
  this.totalLitros = this.dineroC / this.n;
  console.log(this.totalLitros);
  this.totalDinero = this.dineroC;
}

pedirPipa(){
// console.log('pedir pipa');
// this.interface ={
//   id: this.idUsuario,
//   cliente: this.cliente,
//   productos: 'pedido pipa',
//   estado: 'enviado',
//   precioTotal: this.totalDinero,
//   fecha: new Date(),
//   valoracion: null,
// };
// console.log(this.interface);

console.log('pedir pipa');
this.producto ={
  id: this.pipaId,
  nombre: 'pipa',
  foto: this.pipaFoto,
  fecha: new Date(),
  precio: this.totalDinero,
};
console.log(this.producto);
this.presentAlert();

}

async presentAlert() {
  if(this.totalDinero){
    const alert = await this.alertController.create({
      header: 'pedir producto?',
      message: 'quieres pedir este producto ahora?',
      buttons: [
        {
        text: 'NO',
        handler: ()=>{
          console.log('NO');
        }
      },
      {
        text: 'SI',
        handler: ()=>{
          this.carritoService.addProducto(this.producto);
          console.log('se agrego con exito :)');
        }
      }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}

guardarPipaPedido(){
        console.log('aver si agrega');
        const path = 'Clientes/' + this.idUsuario + '/pedidos/';
        const idPhatPipa = this.firestoreService.getId();
        console.log('pedido pipa',  this.interface, idPhatPipa);
        this.firestoreService.createDoc(this.interface, path, idPhatPipa).then( () => {
          console.log('añadido con exito ');
  });
}



}

interface PipaCard {
  id: string;
  nombre: string;
  precioLitro: number;
  foto: string;
  fecha: Date;
}
interface PipaVal {
  id: string;
  estado: string;
  productos: string;
  cliente: Cliente;
  precioTotal: number;
  fecha: any;
  valoracion: any;
}

interface PipaVal2 {
  id: string;
  nombre: string;
  foto: string;
  fecha: any;
  precio: number;
}
