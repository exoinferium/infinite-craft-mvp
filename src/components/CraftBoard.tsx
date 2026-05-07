import type { ElementItem } from '../types/game'

interface CraftBoardProps {
  first: ElementItem | null
  second: ElementItem | null
  attempts: number
  feedback: string
  onCraft: () => void
  onClear: () => void
}

export const CraftBoard = ({ first, second, attempts, feedback, onCraft, onClear }: CraftBoardProps) => {
  return (
    <section className="panel craft-panel">
      <h2>Craft Board</h2>
      <p className="subtle">Select two discovered elements, then combine.</p>
      <div className="craft-slots">
        <div className="craft-slot">{first ? `${first.emoji} ${first.name}` : 'First element'}</div>
        <div className="craft-plus">+</div>
        <div className="craft-slot">{second ? `${second.emoji} ${second.name}` : 'Second element'}</div>
      </div>
      <div className="actions">
        <button type="button" disabled={!first || !second} onClick={onCraft}>
          Craft
        </button>
        <button type="button" className="secondary" onClick={onClear}>
          Clear
        </button>
      </div>
      <p className="feedback">{feedback}</p>
      <p className="subtle">Attempts: {attempts}</p>
    </section>
  )
}
