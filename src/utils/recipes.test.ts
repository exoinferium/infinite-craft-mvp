import { describe, expect, it } from 'vitest'
import { toPairKey } from '../data/recipes'
import { resolveRecipe } from './recipes'

describe('recipe utilities', () => {
  it('normalizes pair keys to be order-independent', () => {
    expect(toPairKey('water', 'fire')).toBe(toPairKey('fire', 'water'))
    expect(toPairKey('earth', 'wind')).toBe('earth+wind')
  })

  it('resolves known recipes and returns null for unknown', () => {
    expect(resolveRecipe('water', 'fire')?.id).toBe('steam')
    expect(resolveRecipe('wind', 'wind')).toBeNull()
  })
})
