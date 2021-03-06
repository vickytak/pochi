import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';


import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
 

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen, smartAudio: SmartAudioProvider, public dp: DataProvider, public auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      smartAudio.preload('tapbox', 'assets/audio/tap2.mp3'); 
      smartAudio.preload('levelup', 'assets/audio/levelup.mp3');
      smartAudio.preload('wrong', 'assets/audio/wrong.mp3');
      smartAudio.preload('right', 'assets/audio/right.mp3');
      let testdata = [1,'+',4,'-',5,'-',9,'+',6];
  //  let queRef =  this.dp.getNewQuestion().push({que: testdata});
    //console.log(queRef.key);
   // this.dp.getNewQuestion().child(queRef.key).set({id:10, que:'hello'});


      
      let authState = this.auth.getauthenticated().subscribe(user=>{
        if(user){
          this.dp.currentUser = user;       
          this.getUserData();
        } else {
          this.rootPage = 'LoginPage';
        }
        authState.unsubscribe();
      })
     
     
    });
  }

  getUserData(){
    this.dp.getuserScore().then( res=>{
       this.getUserQues(this.dp.userData.stage);
       
     }).catch(err => console.error(err));  
  }

  getUserQues(stage){
    this.dp.getAllQue().then((snapshotChanges) => {      
      if(snapshotChanges.val() != null){
       snapshotChanges.forEach( val =>{         
         this.dp.queArray.push(val.val());
       });
       this.rootPage = 'HomePage';
     }else{
       this.rootPage = 'FinishPage';
     }},err =>{
       console.log(err);
     });
  }
}

