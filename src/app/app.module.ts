import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadFormularComponent } from './components/intro-header/upload-formular/upload-formular.component';
import { DateStepperComponent } from './components/date-stepper/date-stepper.component';
import { MapComponent } from './components/map/map.component';
import { IntroHeaderComponent } from './components/intro-header/intro-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {UploadFormularNonTestedComponent} from './components/intro-header/upload-formular-non-tested/upload-formular-non-tested.component';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MapService} from './services/map.service';
import {agmConfig} from '../environments/secrets';
import {environment} from '../environments/environment';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GoogleSignInModalComponent } from './components/google-sign-in-modal/google-sign-in-modal.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {AngularFireModule} from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    UploadFormularComponent,
    DateStepperComponent,
    MapComponent,
    IntroHeaderComponent,
    UploadFormularNonTestedComponent,
    GoogleSignInModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot(agmConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    // Angular Material Modules,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    MapService,
    MatSnackBar,
    { provide: MatDialogRef, useValue: {}},
  ],
  entryComponents: [GoogleSignInModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
