import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './components/home-page/home-page.module';
import { SiteGuardGuard } from './authentication/site-guard.guard';
import { RedirectedPageComponent } from './components/redirected-page/redirected-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EkartPageComponent } from './components/ekart-page/ekart-page.component';
import { CommunityComponent } from './components/community/community.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectedPageComponent,
    EkartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule,
    BrowserAnimationsModule
  ],
  providers: [SiteGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
