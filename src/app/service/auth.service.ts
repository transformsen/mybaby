import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth,
              private platform: Platform, private googlePluse: GooglePlus) { 
    this.user = this.fireAuth.authState;
  }
  signUp(email: string, password: string, userName: string){
    return from(this.fireAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(concatMap(
        (data)=>{
          return data.user.updateProfile({
            displayName: userName
          })
        }
      )
    )
  }
  
  login(email: string, password: string){
    return from(this.fireAuth.auth.signInWithEmailAndPassword(email, password))
  }


  googleLogin(){    
    if(this.platform.is('cordova')){
      return this.natvieGoogleLogin()
    }else{
      return this.webGoogleLogin()
    }
  }

  private natvieGoogleLogin(){   
    return from(this.googlePluse.login({
      'webClientId': '376306847769-062eh6p6e5maeijqkh4b19q38gdt4t8u.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })).pipe(
      concatMap((gplusUser)=>{
        return this.fireAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
      })
    )
  }

  private webGoogleLogin(){
      const provider = new firebase.auth.GoogleAuthProvider()
      return from(this.fireAuth.auth.signInWithPopup(provider))
  }

  googleSignout(){
    return from(this.fireAuth.auth.signOut())
  }
}
