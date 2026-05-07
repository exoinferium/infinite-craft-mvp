import type { ElementId, ElementItem, Recipe } from '../types/game'

export const STARTER_ELEMENT_IDS: ElementId[] = ['water', 'fire', 'earth', 'wind']

export const ELEMENTS: Record<ElementId, ElementItem> = {
  water: { id: 'water', name: 'Water', emoji: '💧' },
  fire: { id: 'fire', name: 'Fire', emoji: '🔥' },
  earth: { id: 'earth', name: 'Earth', emoji: '🪨' },
  wind: { id: 'wind', name: 'Wind', emoji: '💨' },
  steam: { id: 'steam', name: 'Steam', emoji: '☁️' },
  mud: { id: 'mud', name: 'Mud', emoji: '🟤' },
  lava: { id: 'lava', name: 'Lava', emoji: '🌋' },
  dust: { id: 'dust', name: 'Dust', emoji: '🌫️' },
  rain: { id: 'rain', name: 'Rain', emoji: '🌧️' },
  plant: { id: 'plant', name: 'Plant', emoji: '🌱' },
  energy: { id: 'energy', name: 'Energy', emoji: '⚡' },
  stone: { id: 'stone', name: 'Stone', emoji: '🗿' },
  cloud: { id: 'cloud', name: 'Cloud', emoji: '☁️' },
  smoke: { id: 'smoke', name: 'Smoke', emoji: '💭' },
}

export const RECIPES: Recipe[] = [
  { left: 'water', right: 'fire', result: 'steam' },
  { left: 'water', right: 'earth', result: 'mud' },
  { left: 'fire', right: 'earth', result: 'lava' },
  { left: 'earth', right: 'wind', result: 'dust' },
  { left: 'water', right: 'wind', result: 'rain' },
  { left: 'earth', right: 'rain', result: 'plant' },
  { left: 'fire', right: 'wind', result: 'smoke' },
  { left: 'fire', right: 'smoke', result: 'energy' },
  { left: 'lava', right: 'water', result: 'stone' },
  { left: 'steam', right: 'wind', result: 'cloud' },
]

export const toPairKey = (leftId: ElementId, rightId: ElementId): string => {
  return [leftId, rightId].sort().join('+')
}

const recipeEntries = RECIPES.map((recipe) => [toPairKey(recipe.left, recipe.right), recipe.result] as const)

export const RECIPE_MAP: Record<string, ElementId> = Object.fromEntries(recipeEntries)
