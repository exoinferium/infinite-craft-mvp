import { STARTER_ELEMENT_IDS } from '../data/recipes'
import type { DiscoveryState } from '../types/game'

const STORAGE_KEY = 'infinite-craft-mvp-state'

const defaultState: DiscoveryState = {
  discoveredIds: STARTER_ELEMENT_IDS,
  attempts: 0,
}

export const loadState = (): DiscoveryState => {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return defaultState
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DiscoveryState>
    const discoveredIds = Array.isArray(parsed.discoveredIds) ? parsed.discoveredIds : STARTER_ELEMENT_IDS
    const attempts = typeof parsed.attempts === 'number' ? parsed.attempts : 0
    return { discoveredIds, attempts }
  } catch {
    return defaultState
  }
}

export const saveState = (state: DiscoveryState): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const clearState = (): void => {
  window.localStorage.removeItem(STORAGE_KEY)
}
