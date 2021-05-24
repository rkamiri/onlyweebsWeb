import {User} from './user';
import {Anime} from './anime';
import {Article} from './article';

export interface Comment {
    user?: User;
    body: string;
    date?: string;
    animeEntity?: Anime;
    articleEntity?: Article;
}
