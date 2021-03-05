import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const googleLogoURL = './../../../assets/Google.svg';

@Component({
  selector: 'app-google-sign-in-modal',
  templateUrl: './google-sign-in-modal.component.html',
  styleUrls: ['./google-sign-in-modal.component.css']
})
export class GoogleSignInModalComponent {


  constructor(public dialogRef: MatDialogRef<GoogleSignInModalComponent>,
              public afAuth: AngularFireAuth,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
                const url = this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL);
                this.matIconRegistry.addSvgIcon('googleLogo', url);
          }


  public doGoogleLogin(): Promise<any> {
    return new Promise<any>(resolve => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          this.dialogRef.close({sucessfulLogin: true});
        });
    });
  }
}
