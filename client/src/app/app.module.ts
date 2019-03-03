import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersComponent } from './components/headers/headers.component';
import { AppRoutingModule } from './app.routing';
import { PumpingsComponent } from './components/pumpings/pumpings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    PumpingsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
