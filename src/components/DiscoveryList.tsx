import { ElementChip } from './ElementChip'
import type { ElementItem } from '../types/game'

interface DiscoveryListProps {
  elements: ElementItem[]
  selectedIds: string[]
  onSelect: (id: string) => void
}

export const DiscoveryList = ({ elements, selectedIds, onSelect }: DiscoveryListProps) => {
  return (
    <section className="panel">
      <h2>Discovered Elements</h2>
      <p className="subtle">{elements.length} total discovered</p>
      <div className="chip-grid">
        {elements.map((element) => (
          <ElementChip
            key={element.id}
            element={element}
            isSelected={selectedIds.includes(element.id)}
            onClick={() => onSelect(element.id)}
          />
        ))}
      </div>
    </section>
  )
}
