import React from 'react'

import style from '../../scss/ui.module.scss'
import { Button } from './buttons'

const TitleChooser = ({
  title,
  choices,
  categorizedChoices,
  choice,
  setChoice,
  label,
  action,
  actionLabel,
}) => {
  const allChoices = [
    ...choices,
    // merge all categorized choices to single array.
    ...Object.keys(categorizedChoices).reduce(
      (accumulator, category) => [
        ...accumulator,
        ...categorizedChoices[category],
      ],
      []
    ),
  ]
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
                    : allChoices.filter(i => `${i.id}` === selectedValue)[0]
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
              {Object.keys(categorizedChoices)
                .sort()
                .map(key => (
                  <optgroup label={key} key={key}>
                    {categorizedChoices[key].map(c => (
                      <option value={c.id} key={c.id}>
                        {c[label]}
                      </option>
                    ))}
                  </optgroup>
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
TitleChooser.defaultProps = {
  categorizedChoices: {},
  choices: [],
}

export default TitleChooser
