export type ElementId = string

export interface ElementItem {
  id: ElementId
  name: string
  emoji: string
}

export interface Recipe {
  left: ElementId
  right: ElementId
  result: ElementId
}

export interface DiscoveryState {
  discoveredIds: ElementId[]
  attempts: number
}

export interface CraftResult {
  resultElement: ElementItem | null
  wasNewDiscovery: boolean
}
