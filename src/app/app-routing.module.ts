import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {ChoiceComponent} from './choice/choice.component';
import {PlaybackComponent} from './playback/playback.component';
import {HomeComponent} from './home/home.component';
import {AnimeComponent} from './anime/anime.component';
import {HelpComponent} from './help/help.component';
import {ListsComponent} from './lists/lists.component';
import {RegisterComponent} from './register/register.component';
import {AccountComponent} from './account/account.component';
import {AnimeResolver} from './anime/anime.resolver';
import {AnimeListComponent} from './anime-list/anime-list.component';
import {AnimeListResolver} from './anime-list/anime.list.resolver';
import {AccountResolver} from './account/account.resolver';
import {ListsResolver} from './lists/lists.resolver';
import {OnelistComponent} from './onelist/onelist.component';
import {OneListResolver} from './onelist/onelist.resolver';
import {ListContentResolver} from './onelist/listcontent.resolver';
import {CreateListComponent} from './create-list/create-list.component';
import {AnimeListResearchResolver} from './anime-list/anime.list.research.resolver';
import {CurrentUserRatingResolver} from './anime/current.user.rating.resolver';
import {GlobalRatingResolver} from './anime/global.rating.resolver';
import {LastListsResolver} from './create-list/last.list.resolver';
import {MylistsComponent} from './mylists/mylists.component';
import {MylistsResolver} from './mylists/mylists.resolver';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {
        path: 'animes', component: AnimeListComponent,
        resolve: {
            animeList: AnimeListResolver
        }
    },
    {
        path: 'animes/research/:research', component: AnimeListComponent,
        resolve: {
            animeList: AnimeListResearchResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'animes/:id',
        component: AnimeComponent,
        resolve: {
            anime: AnimeResolver,
            globalRating: GlobalRatingResolver,
            currentUserRating: CurrentUserRatingResolver,
            currentUser: AccountResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'lists', component: ListsComponent,
        resolve: {
            allLists: ListsResolver,
            lastList: LastListsResolver
        }
    },
    {
        path: 'lists/:id', component: OnelistComponent,
        resolve: {
            list: OneListResolver,
            listContent: ListContentResolver,
            getAnimeList: AnimeListResolver
        }
    },
    {path: 'login', component: SigninComponent},
    {path: 'help', component: HelpComponent},
    {path: 'choice', component: ChoiceComponent},
    {path: 'playback', component: PlaybackComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'account', component: AccountComponent,
        resolve: {
            currentUser: AccountResolver
        }
    },
    {
        path: 'create-list', component: CreateListComponent,
        resolve: {
            getAnimeList: AnimeListResolver,
            getCurrentList: ListsResolver,
            lastList: LastListsResolver
        }
    },
    {path: 'my-lists', component: MylistsComponent,
        resolve: {
            myLists: MylistsResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
