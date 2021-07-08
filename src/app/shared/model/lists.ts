import { User } from './user';

export interface Lists {
	id?: number;
	name: string;
	creationDate?: string;
	description: string;
	isOwnedBy?: User;
}
