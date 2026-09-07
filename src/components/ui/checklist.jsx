import React from 'react'
import { checklist } from '../../scss/ui.module.scss'

export const Checklist = ({ items, selected, setSelected, maxSelected }) => {
  const toggleSelectedItem = (itemId) => {
    if (selected.includes(itemId)) {
      setSelected(selected.filter((id) => id !== itemId))
    } else {
      const newItems = [...selected, itemId]
      if (newItems.length > maxSelected) {
        newItems.shift()
      }
      setSelected(newItems)
    }
  }

  return (
    <div className={checklist}>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            checked={selected.includes(item.id)}
            onChange={() => toggleSelectedItem(item.id)}
          />
          {item.name}
        </label>
      ))}
    </div>
  )
}
