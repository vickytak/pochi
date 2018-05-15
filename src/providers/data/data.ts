
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Score } from '../../models/userscore.model';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  userData:Score =  { level: 1, subLevel: 1, score: 0, sublevelScore:0 };  
  currentUser:any;
private userScoreRef = this.afDb.database.ref('/users/')
  constructor(private storage: Storage, private afDb : AngularFireDatabase) {
    
  }

  public setUserData(data) {
    console.log(data);
    this.storage.set('userData', data);
 }

 public deleteDefaultPassword() {
     this.storage.remove('userData');
 }

 public async getUserData() {
     return await this.storage.get('userData');
 }



 getuserScore() {
   console.log(this.currentUser.uid);
  //  return this.afDb.list('/users/'+this.currentUser.uid+'/score/');
  return this.afDb.database.ref('/users/'+this.currentUser.uid+'/score/');
 }

 adduserScore(score : Score){
   return this.userScoreRef.push(score);
 }


 updateUserScore(){
   return this.afDb.database.ref('/users/'+this.currentUser.uid+'/');
 }

 createUserScore(uid){
   console.log(uid);
  return this.userScoreRef.child(uid)
   .child('/score/')
   .set(this.userData);
 }

 getNewQuestion(){
   console.log('create new');
   return this.afDb.database.ref('/questions/');
 }

 getAllQue(){
   console.log('hello');
  return this.afDb.list('/questions');
 }

}
