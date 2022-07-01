import { Injectable } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';
import { Subscription } from 'rxjs';


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

nuevosSuscriber: Subscription;
  constructor(public platform: Platform,
              public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService) {
                // this.inicializar();
      this.stateUser();
    }

    stateUser() {
      this.firebaseauthService.stateAuth().subscribe( res => {
        console.log(res);
        if (res !== null) {
           this.inicializar();
           // this.presentToast();
        }
      });
    }

    inicializar() {
      if (this.platform.is('capacitor')) {
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });

        PushNotifications.addListener('registration', (token: Token) => {
          // alert('Push registration success, token: ' + token.value);
        });

        PushNotifications.addListener('registrationError', (error: any) => {
          // alert('Error on registration: ' + JSON.stringify(error));
        });

        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotificationSchema) => {
            // alert('Push received: fffff f ' + JSON.stringify(notification));
          },
        );

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (notification: ActionPerformed) => {
            // alert('Push action performed: ' + JSON.stringify(notification));
          },
        );

   } else {
     console.log('PushNotifications.requestPermission() -> no es movil');
   }

    }

}
