import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-optionmenu',
  templateUrl: './optionmenu.component.html',
  styleUrls: ['./optionmenu.component.scss'],
})
export class OptionmenuComponent implements OnInit {

  admin = false;
  repartidor = false;
  usuario = false;
  idUsuario = '';

  constructor(public menu: MenuController,
              private firebaseauthService: FirebaseauthService,
              private navController: NavController) { }

  ngOnInit() {
    this.getUid();
  }

  getUid() {
    //cambio
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
            this.navController.navigateForward('/optionmenu');
            this.idUsuario = res.uid;
              if (this.idUsuario === '187y100QW5TOVh9L0QrvNxhQq0E3')  {
                  this.admin = true;
                  this.usuario = false;
                  this.repartidor = false;
                  console.log('admin');
                  console.log('if');
              }else if ((this.idUsuario === 'ho5WkgzjmfV6L2KnIfkGhEkwKXe2') || (this.idUsuario === 'sBREvbV7nEVurz2hpdukea0leJG3')
              || (this.idUsuario === 'mqsh290Nzce827BYKNu3Nwll3fC2')
              || (this.idUsuario === 'bUqF01m4o8V33BmnXKmaIcunQgY2')
              || (this.idUsuario === 'vM4mmiQtlrUzwhiIHvSPntyftvt1')) {
                 this.admin = false;
                 this.repartidor = true;
                 this.usuario = false;
                 console.log('repartidor');
                 console.log('eslse if');
              }else{
                this.admin = false;
                this.repartidor = false;
                this.usuario = true;
                console.log('usuario');
                console.log('else');
              }

          } else {
            this.admin = false;
            this.repartidor = false;
            this.usuario = true;
            console.log('else3');
            this.navController.navigateForward('/perfil');
          }
    });
}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  onClick(){
    this.navController.navigateForward('/pipa');
  }

}
