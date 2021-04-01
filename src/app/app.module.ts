import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './signin/signin.component';
import { ChoiceComponent } from './choice/choice.component';
import { PlaybackComponent } from './playback/playback.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AnimeComponent } from './anime/anime.component';
import { ListsComponent } from './lists/lists.component';
import { HelpComponent } from './help/help.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptor} from './HttpRequestInterceptor';
import { AnimeListComponent } from './anime-list/anime-list.component';
import {SharedModule} from './shared/shared.module';
import { OnelistComponent } from './onelist/onelist.component';
import { CreateListComponent } from './create-list/create-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ChoiceComponent,
    PlaybackComponent,
    HomeComponent,
    NavComponent,
    AnimeComponent,
    ListsComponent,
    HelpComponent,
    FooterComponent,
    RegisterComponent,
    AccountComponent,
    AnimeListComponent,
    OnelistComponent,
    CreateListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        TypeaheadModule.forRoot(),
        BrowserAnimationsModule
    ],
  providers: [
      [
          { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
          { provide: LocationStrategy, useClass: HashLocationStrategy }
      ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
