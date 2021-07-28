import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './features/pages/login/login.component';
import { SignupComponent } from './features/pages/signup/signup.component';
import { AlertComponent } from './core/components/alert/alert.component';
import { BannerComponent } from './features/components/banner/banner.component';
import { MovieListComponent } from './features/pages/movie-list/movie-list.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HttpHeadersInterceptor } from './core/interceptor/http-headers.interceptors';
import { HttpErrorsInterceptor } from './core/interceptor/http-errors.interceptor';
import { PipesModule } from './features/shared/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsComponent } from './features/pages/movie-details/movie-details.component';
import { ProfileMenuComponent } from './core/components/nav-bar/profile-menu/profile-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoadingComponent } from './core/components/loading/loading.component';
import { LogService } from './core/logging/log.service';
import { LogPublisherService } from './core/logging/log-publisher.service';
import { OpenAsGuestModalComponent } from './features/components/open-as-guest-modal/open-as-guest-modal.component';
import { MovieBookingComponent } from './features/pages/movie-booking/movie-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    BannerComponent,
    MovieListComponent,
    MovieDetailsComponent,
    ProfileMenuComponent,
    LoadingComponent,
    OpenAsGuestModalComponent,
    MovieBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCarouselModule.forRoot(),
    PipesModule,
    NgbModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor, 
      multi: true,
    },
    LogService,
    LogPublisherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
