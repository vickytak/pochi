
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading, ActionSheetController, ToastController, Alert } from 'ionic-angular';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {
  loading:Loading;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController ) {
    console.log('Hello UtilityProvider Provider');
  }

  showLoading(loadtext) {
    this.loading = this.loadingCtrl.create({
      content: loadtext,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showLongLoading(loadtext) {
    this.loading = this.loadingCtrl.create({
      content: loadtext,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showMessage(title, subtitle) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  dismissloader(){
    if(this.loading){
      this.loading.dismiss();
    }else{
      this.loading.dismiss();
    }
  }

  showError(msg) {
    if (this.loading) {
      this.loading.dismiss();
    }
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  PromptAlert() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure to logout from your account',
      // inputs: [
      //   { 
      //     type: 'number',
      //     name: 'vcode',
      //     placeholder: 'Verify Code'
      //   }
      // ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            alert.dismiss(false);
            return false;
          }
        },
        {
          text: 'Yes',
          handler: data => {
            alert.dismiss(true);
            return false;

          }
        }
      ]
    });
    return alert;
  }

}
