import { useEffect, useMemo, useState } from 'react'
import { CraftBoard } from './components/CraftBoard'
import { DiscoveryList } from './components/DiscoveryList'
import { ELEMENTS, STARTER_ELEMENT_IDS } from './data/recipes'
import './styles/game.css'
import { resolveRecipe } from './utils/recipes'
import { clearState, loadState, saveState } from './utils/storage'

function App() {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => loadState().discoveredIds)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [attempts, setAttempts] = useState<number>(() => loadState().attempts)
  const [feedback, setFeedback] = useState<string>('Pick two elements to discover something new.')

  const discoveredElements = useMemo(() => {
    return discoveredIds.map((id) => ELEMENTS[id]).filter(Boolean)
  }, [discoveredIds])

  const firstSelected = selectedIds[0] ? ELEMENTS[selectedIds[0]] : null
  const secondSelected = selectedIds[1] ? ELEMENTS[selectedIds[1]] : null

  const handleSelect = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id)
      }
      if (current.length === 2) {
        return [current[1], id]
      }
      return [...current, id]
    })
  }

  const clearSelection = () => {
    setSelectedIds([])
    setFeedback('Selection cleared. Pick two elements to continue crafting.')
  }

  const resetProgress = () => {
    const confirmed = window.confirm('Reset discoveries and attempts?')
    if (!confirmed) {
      return
    }
    clearState()
    setDiscoveredIds(STARTER_ELEMENT_IDS)
    setSelectedIds([])
    setAttempts(0)
    setFeedback('Progress reset. Start crafting again from the basic elements.')
  }

  const craft = () => {
    if (!firstSelected || !secondSelected) {
      return
    }

    setAttempts((value) => value + 1)

    const crafted = resolveRecipe(firstSelected.id, secondSelected.id)
    if (!crafted) {
      setFeedback(`No recipe for ${firstSelected.name} + ${secondSelected.name} yet.`)
      return
    }

    const alreadyDiscovered = discoveredIds.includes(crafted.id)
    if (!alreadyDiscovered) {
      setDiscoveredIds((current) => [...current, crafted.id])
      setFeedback(`New discovery: ${crafted.emoji} ${crafted.name}!`)
    } else {
      setFeedback(`You made ${crafted.emoji} ${crafted.name} again.`)
    }
  }

  useEffect(() => {
    saveState({ discoveredIds, attempts })
  }, [attempts, discoveredIds])

  return (
    <main className="app-shell">
      <header>
        <h1>Infinite Craft MVP</h1>
        <p>Combine discovered elements to unlock new creations.</p>
        <button type="button" className="secondary reset-button" onClick={resetProgress}>
          Reset Progress
        </button>
      </header>

      <div className="game-layout">
        <DiscoveryList elements={discoveredElements} selectedIds={selectedIds} onSelect={handleSelect} />
        <CraftBoard
          first={firstSelected}
          second={secondSelected}
          attempts={attempts}
          feedback={feedback}
          onCraft={craft}
          onClear={clearSelection}
        />
      </div>
    </main>
  )
}

export default App
