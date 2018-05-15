
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
currentUser:any;
  constructor(private afAuth: AngularFireAuth) {
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
    this.afAuth.auth.signOut();
  }

}
