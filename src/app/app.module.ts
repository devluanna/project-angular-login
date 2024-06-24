import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideRouter } from '@angular/router';
import { routes } from '../app/app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { HomeDefaultComponent } from './components/home-default/home-default.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubmenuNavbarComponent } from './components/submenu-navbar/submenu-navbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
  AppComponent,
  HomeDefaultComponent,
  SidebarComponent,
  NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
