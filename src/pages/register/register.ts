import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilityProvider } from '../../providers/utility/utility';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user: any = {email:'', password:''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public ut: UtilityProvider, public dp: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegister(){
    this.ut.showLongLoading('Registering...');
    this.auth.register(this.user)
    .then( user =>{
      console.log(user);
      this.dp.createUserScore(user.uid).then( res=>  this.navCtrl.setRoot('LoginPage'));         
      //console.log(user);
     // this.ut.loading.dismiss();
    })
    .catch(err=> {alert(err.message);this.ut.loading.dismiss();});
    //this.ut.loading.dismiss();
  }

  onLogout(){
    this.auth.logout();
  }

}
