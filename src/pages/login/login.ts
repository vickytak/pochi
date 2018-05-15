import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any = {email:'', password:''};
  public recaptchaVerifier:AngularFireAuth;;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,public dp: DataProvider) {
  }

  ionViewDidLoad() {
   // this.recaptchaVerifier = new AngularFireAuth.RecaptchaVerifier('recaptcha-container');
  }

  signIn(){
    this.auth.login(this.user)
    .then(user=>{
      this.dp.currentUser = user;
      this.navCtrl.setRoot('HomePage');
    })
    .catch(err => alert(err.message));
  }

}
