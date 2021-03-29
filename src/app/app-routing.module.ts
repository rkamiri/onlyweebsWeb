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
import {AnimeListResearchResolver} from './anime-list/anime.list.research.resolver';

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
            anime: AnimeResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'lists', component: ListsComponent,
        resolve: {
            allLists: ListsResolver
        }
    },
    {
        path: 'lists/:id', component: OnelistComponent,
        resolve: {
            list: OneListResolver,
            listContent: ListContentResolver
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
