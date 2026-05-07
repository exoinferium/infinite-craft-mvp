import type { ElementItem } from '../types/game'

interface ElementChipProps {
  element: ElementItem
  onClick: () => void
  isSelected?: boolean
}

export const ElementChip = ({ element, onClick, isSelected = false }: ElementChipProps) => {
  return (
    <button type="button" className={`element-chip${isSelected ? ' selected' : ''}`} onClick={onClick}>
      <span>{element.emoji}</span>
      <span>{element.name}</span>
    </button>
  )
}
