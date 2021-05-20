import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SigninComponent} from './signin/signin.component';
import {PlaybackComponent} from './playback/playback.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {AnimeComponent} from './anime/anime.component';
import {ListsComponent} from './lists/lists.component';
import {HelpComponent} from './help/help.component';
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';
import {AccountComponent} from './account/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './HttpRequestInterceptor';
import {AnimeListComponent} from './anime-list/anime-list.component';
import {SharedModule} from './shared/shared.module';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload';
import {OnelistComponent} from './onelist/onelist.component';
import { MylistsComponent } from './mylists/mylists.component';
import { ListCreateComponent } from './list-create/list-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from '@hardpool/ngx-spinner';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import {NgImageSliderModule} from "ng-image-slider";


@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
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
        MylistsComponent,
        ListCreateComponent,
        ArticleListComponent,
        ArticleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        TypeaheadModule.forRoot(),
        FileUploadModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        NgImageSliderModule
    ],
    providers: [
        [
            {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
            {provide: LocationStrategy, useClass: HashLocationStrategy}
        ],
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
