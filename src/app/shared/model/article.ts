import {User} from './user';
import {Image} from './image';

export interface Article {
    id: number;
    title: string;
    body: string;
    created_at: string;
    author: User;
    cover: Image;
}
