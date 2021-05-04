import {User} from './user';

export interface Comment {
    usersEntity: User;
    anime_id: number;
    comment: string;
    date: string;
}
