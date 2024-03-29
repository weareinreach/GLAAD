import { type LiteralUnion } from 'type-fest'

import bipoc from '~public/assets/characters/final/bipoc.png'
import disabled from '~public/assets/characters/final/disabled.png'
import elder from '~public/assets/characters/final/elder.png'
import immigrant from '~public/assets/characters/final/immigrant.png'
import queer from '~public/assets/characters/final/queer.png'
import transman from '~public/assets/characters/final/transman.png'
import transmasc from '~public/assets/characters/final/transmasc.png'

export const categoryImages = {
	bipoc,
	disabled,
	elder,
	immigrant,
	queer,
	transman,
	'transmasc-nonbinary': transmasc,
} as const

export const isValidCategoryImage = (category: unknown): category is keyof typeof categoryImages =>
	typeof category === 'string' && Object.hasOwn(categoryImages, category)

export const getCategoryImage = (category: LiteralUnion<keyof typeof categoryImages, string>) => {
	if (isValidCategoryImage(category)) return categoryImages[category]

	return categoryImages.transman
}
