import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { PlaybackComponent } from './playback/playback.component';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { HelpComponent } from './help/help.component';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { OnelistComponent } from './onelist/onelist.component';
import { MylistsComponent } from './mylists/mylists.component';
import { ListCreateComponent } from './list-create/list-create.component';
import { AccountResolver } from './shared/resolver/account.resolver';
import { ListsResolver } from './shared/resolver/lists.resolver';
import { LastListsResolver } from './shared/resolver/last.list.resolver';
import { OneListResolver } from './shared/resolver/onelist.resolver';
import { ListContentResolver } from './shared/resolver/listcontent.resolver';
import { CustomListsResolver } from './shared/resolver/custom.lists.resolver';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { ArticleResolver } from './shared/resolver/article.resolver';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { NotFoundErrorComponent } from './errors/not-found-error/not-found-error.component';
import { ForbiddenErrorComponent } from './errors/forbidden-error/forbidden-error.component';
import { UnauthorizedErrorComponent } from './errors/unauthorized-error/unauthorized-error.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { AnimeResolver } from './shared/resolver/anime.resolver';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './shared/resolver/user.resolver';
import { StatsComponent } from './stats/stats.component';
import { GeneralStatsResolver } from './shared/resolver/stats/general.stats.resolver';
import { AverageStatsResolver } from './shared/resolver/stats/average.stats.resolver';

const routes: Routes = [
    { path: 'not-found', component: NotFoundErrorComponent },
    { path: 'forbidden', component: ForbiddenErrorComponent },
    { path: 'unauthorized', component: UnauthorizedErrorComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    {
        path: 'animes/research',
        component: AnimeListComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'animes/:id',
        component: AnimeComponent,
        runGuardsAndResolvers: 'always',
        resolve: { anime: AnimeResolver },
    },
    {
        path: 'animes/page/:page',
        component: AnimeListComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'lists/:id',
        component: OnelistComponent,
        resolve: { list: OneListResolver, listContent: ListContentResolver },
    },
    {
        path: 'user/:id',
        component: UserComponent,
        resolve: { user: UserResolver },
    },
    { path: 'login', component: SigninComponent },
    { path: 'help', component: HelpComponent },
    { path: 'playback', component: PlaybackComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'stats',
        component: StatsComponent,
        resolve: {
            generalStats: GeneralStatsResolver,
            averageStats: AverageStatsResolver,
        },
    },
    {
        path: 'account',
        component: AccountComponent,
        resolve: { currentUser: AccountResolver },
    },
    {
        path: 'list-create',
        component: ListCreateComponent,
        resolve: { getCurrentList: ListsResolver, lastList: LastListsResolver },
    },
    {
        path: 'articles',
        component: ArticleListComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'articles/:id',
        component: ArticleComponent,
        resolve: { article: ArticleResolver },
        runGuardsAndResolvers: 'always',
    },
    { path: 'my-lists', component: MylistsComponent },
    { path: 'editor', component: ArticleEditorComponent },
    { path: 'password-update/:token', component: PasswordUpdateComponent },
    {
        path: 'lists',
        component: ListsComponent,
        resolve: {
            allLists: ListsResolver,
            lastList: LastListsResolver,
            customLists: CustomListsResolver,
        },
    },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            relativeLinkResolution: 'legacy',
        }),
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
