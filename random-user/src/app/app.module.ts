import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Http
import {HttpClientModule} from '@angular/common/http'

// For Toast
import {ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Font Awesome
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
