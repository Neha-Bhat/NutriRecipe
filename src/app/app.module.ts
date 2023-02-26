import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFileService } from './services/user-file.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    ChartModule
  ],
  providers: [UserFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
