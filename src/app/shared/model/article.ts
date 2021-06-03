import { User } from './user';
import { Image } from './image';
import { ArticleCategories } from './articleCategories';

export interface Article {
    id: number;
    title: string;
    body: string;
    created_at: Date;
    author: User;
    cover: Image;
    category: ArticleCategories;
}
