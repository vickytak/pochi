import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { TimerProvider } from '../../providers/timer/timer';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { DataProvider } from '../../providers/data/data';
import { snapshotChanges } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result:any = 0;
  gamenumber : any = [1,'+',3,'-',9,'-',5,'+',3];  
  selected:number = 0;
  isNumber:boolean = false;
  isAirth:boolean = true;
  isFirst:boolean = true;
  box:any = [false,false, false, false, false, false, false, false, false, false];  
  operand:any = null;
  quesType:number=2;
  totalSelected:number = 0;
  matchNumber:number = 4;
  resultText:any;
  timer:any = 30;
  score:any = 0;
  level:any = 1;
  subLevel:any = 1;
  forSublevelUp = 0;
  forLevelup=0;
  userData:any;
  queArray:any = [];


  lastBoxSelected:any;
  constructor(public navCtrl: NavController, public time: TimerProvider, public smartAudio : SmartAudioProvider, public admob: AdMobFree,public dp: DataProvider) {
    //this.timer = time.countDown;    
    this.showBanner();   
    dp.getuserScore().on("value", snapshotChanges =>{
     this.dp.userData= snapshotChanges.val();    
    });
   //this.dp.getAllQue().once("value")
   this.dp.getAllQue().valueChanges().subscribe(res=> {
     res.forEach( val=>{      
       this.queArray.push(val);
     });
     this.gamenumber = this.queArray[0].que;
   });
  
  
 // this.gamenumber = this.queArray[0].que;
  

      
  }

  onboxTap(num, idx){
    this.selected = idx;
  }

 


  checkValues(){
    console.log('first number :'+ this.isFirst+ ' last select is number :' + this.isNumber + ' last select is operator:' + this.isAirth );
  }


 

  init(){
    
    setTimeout(()=>{
      this.result = 0;     
      this.isFirst = true;
      this.box =[false,false, false, false, false, false, false, false, false, false];     
      this.operand = null;
      this.totalSelected=0;
    }, 300);
  }

 onGamePadTap(type, idx, val){

  console.log(type, idx, val);
  if( type == 'operand' && this.forOperand(idx, val) ){
    this.onBoxTap('tapbox');
    this.lastBoxSelected = idx;
    this.box[idx] = true;
    this.operand = val;
  }else if(type == 'number' && this.forNumber(idx, val)){
    this.onBoxTap('tapbox');
    this.isFirst = false;
    this.lastBoxSelected = idx;
    this.box[idx] = true;
    this.calculate(val);
  }
 }


 calculate(num){
  
  this.totalSelected += 1;
 if(this.operand == '+'){
    this.result += num;
    
 }else if(this.operand == '-'){
   this.result -= num;
 }else{
   this.result = num;
 }

 if(this.totalSelected == this.quesType){
  this.checkResult();
  
 }
 //this.dp.setUserData(this.dp.userData);   
}

checkResult(){
  console.log(this.matchNumber, this.result);
  if(this.matchNumber == this.result){ 
    this.dp.userData.score += 100;   
 // this.dp.userData.score += 100; 
  this.onBoxTap('right');
  this.Levelup();
  }else{  
  //  this.dp.updateUserScore().update({score: this.dp.userData.score -= 100})
   this.onBoxTap('wrong');
  }
  // this.dp.adduserScore(this.dp.userData).then(ref => {
  //   console.log(ref.key);
  // }); 
  this.init();
}

Levelup(){
  //this.forSublevelUp +=1;
  this.dp.userData.sublevelScore += 1;
  console.log(this.dp.userData.sublevelScore);
//  console.log(this.queArray[this.dp.userData.sublevelScore].que);
  this.gamenumber = this.queArray[this.dp.userData.sublevelScore].que;
  if(this.dp.userData.sublevelScore > 9){
    this.dp.userData.subLevel += 1;
    this.dp.userData.sublevelScore = 0;
    this.onBoxTap('levelup');
    this.launchInterstitial();
  }
  if(this.dp.userData.subLevel > 10){
    this.dp.userData.level += 1;
    this.dp.userData.subLevel = 1;
    this.dp.userData.sublevelScore = 0;
    this.onBoxTap('levelup');
    this.launchInterstitial();
  } 
  this.dp.updateUserScore().update({score: this.dp.userData}) ;
}


 forOperand(idx, val){

    if(!this.isFirst){
      if( idx == 2 && (this.lastBoxSelected == 1 || this.lastBoxSelected == 3 || this.lastBoxSelected == 5) && !this.box[idx] ) {
         return true;
        }

        if(idx == 4 && (this.lastBoxSelected == 1 || this.lastBoxSelected == 5 || this.lastBoxSelected == 7) && !this.box[idx] ){
         return true
        }

        if(idx == 6 && (this.lastBoxSelected == 3 || this.lastBoxSelected == 5 || this.lastBoxSelected == 9) && !this.box[idx]){
         return true;
        }

        if(idx == 8 && (this.lastBoxSelected == 5 || this.lastBoxSelected == 7 || this.lastBoxSelected == 9) && !this.box[idx]){
         return true;
        }
    }
  return false;
 }

 forNumber(idx, val){
  if(this.isFirst){
    //this.updateForFirst(idx, val);
    return true;
  }else{
    return this.updateValForNumber(idx, val);
  }
 }

 updateValForNumber(idx, val){
  if( idx == 1 && ( this.lastBoxSelected == 4 ||  this.lastBoxSelected == 2) && !this.box[idx]){
      return true;
  }else if( idx == 3 && (this.lastBoxSelected == 2 || this.lastBoxSelected == 6) && !this.box[idx] ){
    return true;
  }else if( idx == 5 && (this.lastBoxSelected == 2 || this.lastBoxSelected == 4 || this.lastBoxSelected == 6 || this.lastBoxSelected == 8) && !this.box[idx] ){
    return true;
  }else if( idx == 7 && (this.lastBoxSelected == 4 || this.lastBoxSelected == 8) && !this.box[idx] ){
    return true;
  }else if( idx == 9 && (this.lastBoxSelected == 6 || this.lastBoxSelected == 8) && !this.box[idx] ){
    return true;
  }else{
    return false;
  }
 }





  onBoxTap(key){
    this.smartAudio.play(key);
  }


  showBanner() {
 console.log('showbanner');
    let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-3940256099942544/6300978111',
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
        console.log('success');
    }).catch(e => console.log(e));

}

launchInterstitial() {
 
  let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-3940256099942544/1033173712',
  };

  this.admob.interstitial.config(interstitialConfig);

  this.admob.interstitial.prepare().then(() => {
      // success
  });

}

}



