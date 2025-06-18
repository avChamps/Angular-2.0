import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './components/home-page/home-page.module';
import { TrainingComponent } from './components/training/training.component';
import { SiteGuardGuard } from './authentication/site-guard.guard';
import { RedirectedPageComponent } from './components/redirected-page/redirected-page.component';
@NgModule({
  declarations: [
    AppComponent,
    RedirectedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule
  ],
  providers: [SiteGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
