
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import {Observable} from  'rxjs/Observable';
import * as firebase from 'firebase/app';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
currentUser:any;
  constructor(private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform) {
    console.log('Hello AuthProvider Provider');   
  }

  getauthenticated() {
//    return this.currentUser;
return this.afAuth.authState;
  }

  login(user){   
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async  register(user){
    return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
   return this.afAuth.auth.signOut();
  }

  loginWithFacebook() {
    return Observable.create(observer => {
    if(this.platform.is('cordova')) {
    return this.fb.login(['email', 'public_profile']).then(res => {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.afAuth.app.auth().signInWithCredential(facebookCredential).then((res)=>{
    observer.next(res);
    }).catch(error => {    
    observer.error(error);
    });
    });
    } else {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(()=>{
    observer.next();
    }).catch(error=>{
    //console.log(error);
    observer.error(error);
    });
    }
    });
    }

}
