import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {PlaybackComponent} from './playback/playback.component';
import {HomeComponent} from './home/home.component';
import {AnimeComponent} from './anime/anime.component';
import {HelpComponent} from './help/help.component';
import {ListsComponent} from './lists/lists.component';
import {RegisterComponent} from './register/register.component';
import {AccountComponent} from './account/account.component';
import {AnimeListComponent} from './anime-list/anime-list.component';
import {OnelistComponent} from './onelist/onelist.component';
import {MylistsComponent} from './mylists/mylists.component';
import {ListCreateComponent} from './list-create/list-create.component';
import {AnimeListResolver} from './shared/resolver/anime.list.resolver';
import {AnimeListResearchResolver} from './shared/resolver/anime.list.research.resolver';
import {AnimeResolver} from './shared/resolver/anime.resolver';
import {GlobalRatingResolver} from './shared/resolver/global.rating.resolver';
import {CurrentUserRatingResolver} from './shared/resolver/current.user.rating.resolver';
import {AccountResolver} from './shared/resolver/account.resolver';
import {ListsResolver} from './shared/resolver/lists.resolver';
import {LastListsResolver} from './shared/resolver/last.list.resolver';
import {OneListResolver} from './shared/resolver/onelist.resolver';
import {ListContentResolver} from './shared/resolver/listcontent.resolver';
import {CustomListsResolver} from './shared/resolver/custom.lists.resolver';
import {MyDefaultListsResolver} from "./shared/resolver/my.default.lists.resolver";
import {MyCustomListsResolver} from "./shared/resolver/my.custom.lists.resolver";

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
            lastList: LastListsResolver,
            customLists: CustomListsResolver
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
    {path: 'playback', component: PlaybackComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'account', component: AccountComponent,
        resolve: {
            currentUser: AccountResolver
        }
    },
    {
        path: 'list-create', component: ListCreateComponent,
        resolve: {
            getAnimeList: AnimeListResolver,
            getCurrentList: ListsResolver,
            lastList: LastListsResolver
        }
    },
    {
        path: 'my-lists', component: MylistsComponent,
        resolve: {
            myCustomLists: MyCustomListsResolver,
            myDefaultLists: MyDefaultListsResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
