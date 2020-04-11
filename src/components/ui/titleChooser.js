import React from 'react'

import style from '../../scss/ui.module.scss'
import { Button } from './buttons'

const TitleChooser = ({
  title,
  choices,
  choice,
  setChoice,
  label,
  action,
  actionLabel,
}) => {
  return (
    <div className={style.titleChooser}>
      <h1>{title}</h1>

      {choices && (
        <select
          onChange={e => {
            const selectedValue = e.target.value
            const c =
              selectedValue === ''
                ? null
                : choices.filter(i => `${i.id}` === selectedValue)[0]
            setChoice(c)
          }}
          value={choice ? choice.id : ''}
        >
          <option value="" />
          {choices.map(c => (
            <option value={c.id} key={c.id}>
              {c[label]}
            </option>
          ))}
        </select>
      )}
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  )
}

export default TitleChooser
