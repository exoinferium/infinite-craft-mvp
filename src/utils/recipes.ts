import { ELEMENTS, RECIPE_MAP, toPairKey } from '../data/recipes'
import type { ElementId, ElementItem } from '../types/game'

export const resolveRecipe = (leftId: ElementId, rightId: ElementId): ElementItem | null => {
  const resultId = RECIPE_MAP[toPairKey(leftId, rightId)]
  if (!resultId) {
    return null
  }
  return ELEMENTS[resultId] ?? null
}
