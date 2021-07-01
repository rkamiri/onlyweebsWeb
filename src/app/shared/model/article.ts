import { User } from './user'
import { ImageDto } from './image'
import { ArticleCategories } from './articleCategories'

export interface Article {
	id: number
	title: string
	body: string
	created_at: Date
	author: User
	cover: ImageDto
	category: ArticleCategories
}
