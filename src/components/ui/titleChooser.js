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
      <div className={style.actions}>
        {choices && (
          <div className={style.selectContainer}>
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
            {choice === null && (
              <div className={style.hint}>Välj ett objekt</div>
            )}
          </div>
        )}
        {action && <Button onClick={action}>{actionLabel}</Button>}
      </div>
    </div>
  )
}

export default TitleChooser
