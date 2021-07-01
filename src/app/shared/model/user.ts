import { ImageDto } from './image';

export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    bio: string;
    ip?: string;
    imageDto: ImageDto;
}
