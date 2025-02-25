import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {actions, titleChooser, selectContainer, hint} from '../../scss/ui.module.scss'
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
  noChoicesLabel,
  onChange,
}) => {
  const allChoices = [
    ...(choices || []),
    // merge all categorized choices to single array.
    ...Object.keys(categorizedChoices).reduce(
      (accumulator, category) => [
        ...accumulator,
        ...categorizedChoices[category],
      ],
      []
    ),
  ]

  // Re-select the previously selected choice if there is one
  useEffect(() => {
    const savedChoice = sessionStorage.getItem(`${title}-selectedItem`)
    if (!savedChoice) {
      return;
    }

    const selectedItem = allChoices.find((item) => `${item.id}` === savedChoice)
    if (selectedItem) {
      setChoice(selectedItem)
    }

  }, [choices, categorizedChoices])

  return (
    <div className={titleChooser}>
      <h1>{title}</h1>
      <div className={actions}>
        {allChoices.length ? (
          <div className={selectContainer}>
            <select
              onChange={e => {
                const selectedValue = e.target.value
                const selectedItem =
                  selectedValue === ''
                    ? null
                    : allChoices.filter(i => `${i.id}` === selectedValue)[0]
                setChoice(selectedItem)
                onChange(e)

                // Save the selected item for refresh re-select
                if (selectedItem) {
                  sessionStorage.setItem(`${title}-selectedItem`, selectedItem.id)
                } else {
                  sessionStorage.removeItem(`${title}-selectedItem`)
                }
              }}
              value={choice ? choice.id : ''}
            >
              <option hidden value="" />
              {choices.sort().map(c => (
                <option value={c.id} key={c.id}>
                  {c[label]}
                </option>
              ))}
              {Object.keys(categorizedChoices)
                .sort()
                .map(key => (
                  <optgroup label={key} key={key}>
                    {categorizedChoices[key].sort().map(c => (
                      <option value={c.id} key={c.id}>
                        {c[label]}
                      </option>
                    ))}
                  </optgroup>
                ))}
            </select>
            {choice === null && (
              <div className={hint}>Välj ett objekt</div>
            )}
          </div>
        ) : (
          <span>{noChoicesLabel}</span>
        )}

        {action && <Button onClick={action}>{actionLabel}</Button>}
      </div>
    </div>
  )
}
TitleChooser.defaultProps = {
  categorizedChoices: {},
  choices: [],
  action: null,
  actionLabel: '',
  choice: null,
  noChoicesLabel: '',
  setChoice: () => {},
  label: '',
  onChange: () => {},
}

TitleChooser.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.array,
  categorizedChoices: PropTypes.object,
  choice: PropTypes.object,
  setChoice: PropTypes.func,
  label: PropTypes.string,
  action: PropTypes.func,
  actionLabel: PropTypes.string,
  noChoicesLabel: PropTypes.string,
  onChange: PropTypes.func,
}

export default TitleChooser
