import {User} from './user';

export interface Comment {
    userEntity: User;
    anime_id: number;
    comment: string;
    date: string;
}
