import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';


import { NativeAudio } from '@ionic-native/native-audio';
import { AdMobFree } from '@ionic-native/admob-free';
import { IonicStorageModule } from '@ionic/storage';

import { TimerProvider } from '../providers/timer/timer';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { DataProvider } from '../providers/data/data';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credential';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UtilityProvider } from '../providers/utility/utility';
import {Facebook} from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    AdMobFree,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerProvider,
    SmartAudioProvider,
    DataProvider,
    AuthProvider,
    UtilityProvider,
    Facebook
    
  ]
})
export class AppModule {}
