import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Módulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorLoginService } from './interceptors/interceptor-login.service';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: InterceptorLoginService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
