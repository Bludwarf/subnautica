import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertisseurComponent } from './convertisseur/convertisseur.component';
import {FormsModule} from '@angular/forms';
import { ArrondiPipe } from './arrondi.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatButtonToggleModule, MatInputModule} from '@angular/material';
import { CoordonneesComponent } from './coordonnees/coordonnees.component';
import { BoussoleComponent } from './boussole/boussole.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvertisseurComponent,
    ArrondiPipe,
    CoordonneesComponent,
    BoussoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
