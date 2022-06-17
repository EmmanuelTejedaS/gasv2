import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../models';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  loading: any;
  productos: Producto[] = [];
  newProducto: Producto;
  enableNewProductos = false;
  newImage = '';
  newFile: '';
  private path = 'productos/';

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  async guardarProducto() {
    const path = 'productos';
    const name = this.newProducto.nombre;
    const precio = this.newProducto.precio;
    const foto = this.newProducto.foto;
    if(name.length && foto.length && precio){
      this.presentLoading();
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newProducto.foto = res;
      console.log('interface', this.newProducto);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.firestoreService.createDoc(this.newProducto,this.path,this.newProducto.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito');
        this.nuevo();
        this.enableNewProductos = false;
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar');
      });
    }else{
      console.log('agrega dato');
    }
  }

  nuevo(){
    this.enableNewProductos = true;
    this.newProducto= {
      nombre: '',
      precio: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
    console.log(this.newProducto.id);
  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(   res => {
      this.productos = res;
      console.log('productos', res);
    });
  }

  async deleteProducto(producto: Producto){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>eliminar</strong> este producto',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
              // this.presentToast('eliminado con exito');
              console.log('borrado');
              console.log('res', res);
              this.presentToast('eliminado con exito');
              // this.alertController.dismiss();
            }).catch( error => {
                // this.presentToast('no se pude eliminar');
                console.log('no se pudo borrar');
                this.presentToast('no se pude eliminar');
                console.log('error', error);
            });
          }
        }
      ]
    });
    await alert.present();
    // this.firestoreService.deleteDoc(this.path, producto.id);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async newImageUpload(event: any) {
    console.log('foto');
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.newProducto.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }
}
