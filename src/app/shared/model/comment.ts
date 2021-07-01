import { User } from './user'
import { AnimeDto } from './anime'
import { Article } from './article'
import { Lists } from './lists'

export interface Comment {
	user?: User
	body: string
	date?: string
	animeEntity?: AnimeDto
	articleEntity?: Article
	listsEntity?: Lists
}
