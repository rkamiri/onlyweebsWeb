import {User} from './user';
import {Anime} from './anime';

export interface Comment {
    user: User;
    body: string;
    date: string;
    animeEntity: Anime;
}
