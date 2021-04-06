import React, { useState, useEffect } from 'react'

let currentKey = 0
// creates an alternative with an unique key, do not manually create alternative objects
// the key does not match the id later given by the server.
const createAlternative = (existingData = {}) => {
  currentKey += 1
  return { text: '', ...existingData, key: currentKey }
}

const AddVote = ({ currentMeeting, create, updateData, update }) => {
  const [question, setQuestion] = useState(
    updateData ? updateData.question : ''
  )
  const [alternatives, setAlternatives] = useState(
    updateData
      ? updateData.alternatives.map(alt => createAlternative(alt))
      : [createAlternative(), createAlternative()]
  )
  const [currentQuestion, setCurrentQuestion] = useState(
    updateData ? updateData.open : true
  )

  const [multiChoiceQuestion, setMultiChoiceQuestion] = useState(
    updateData ? updateData.max_number_of_selectable_alternatives > 1 : false
  )
  const [exactAmountOfAlternatives, setExactAmountOfAlternatives] = useState(
    updateData
      ? updateData.min_number_of_selectable_alternatives ===
          updateData.max_number_of_selectable_alternatives
      : false
  )
  const [userOptionMinAmount, setUserOptionMinAmount] = useState(
    updateData ? updateData.min_number_of_selectable_alternatives : 1
  )
  const [userOptionMaxAmount, setUserOptionMaxAmount] = useState(
    updateData ? updateData.max_number_of_selectable_alternatives : 1
  )

  return (
    <div>
      <label>
        Fråga
        <input
          value={question}
          onChange={e => {
            setQuestion(e.target.value)
          }}
        />
      </label>
      <hr />
      <ul>
        {alternatives.map((alt, i) => (
          <li key={alt.key}>
            <input
              value={alt.text}
              onChange={e => {
                const newVal = e.target.value
                setAlternatives(prev => [
                  ...prev.slice(0, i),
                  { ...prev[i], text: newVal },
                  ...prev.slice(i + 1),
                ])
              }}
            />
            <button
              type="button"
              onClick={() => {
                setAlternatives(prev => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          setAlternatives(prev => [...prev, createAlternative()])
        }}
      >
        Lägg till alternativ
      </button>
      <hr />
      <label>
        <input
          type="checkbox"
          checked={currentQuestion}
          onChange={() => setCurrentQuestion(prev => !prev)}
        />
        Nuvarande frågan
      </label>
      <hr />

      <label>
        <input
          type="checkbox"
          checked={multiChoiceQuestion}
          onChange={() => {
            setMultiChoiceQuestion(prev => !prev)
            setUserOptionMinAmount(1)
            setUserOptionMaxAmount(1)
          }}
        />
        Flervalsfråga
      </label>

      <hr />

      {multiChoiceQuestion && (
        <>
          <label>
            <input
              type="checkbox"
              checked={exactAmountOfAlternatives}
              onChange={() => {
                setExactAmountOfAlternatives(prev => !prev)
                setUserOptionMinAmount(1)
                setUserOptionMaxAmount(1)
              }}
            />
            Ett exakt antal valbara alternativ
          </label>

          <hr />
        </>
      )}

      {multiChoiceQuestion && exactAmountOfAlternatives && (
        <>
          <label>
            Antal alternativ som
            <br />
            ska väljas av deltagarna:
            <br />
          </label>
          <select
            name="min-svar"
            id="min-svar"
            onChange={e => {
              setUserOptionMinAmount(Number(e.target.value))
              setUserOptionMaxAmount(Number(e.target.value))
            }}
            defaultValue={userOptionMaxAmount}
          >
            {alternatives.map((alt, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <br />
        </>
      )}

      {multiChoiceQuestion && !exactAmountOfAlternatives && (
        <>
          <label>
            Minsta antal alternativ som
            <br />
            kan väljas av deltagarna:
            <br />
          </label>
          <select
            name="min-svar"
            id="min-svar"
            onChange={e => setUserOptionMinAmount(Number(e.target.value))}
            defaultValue={userOptionMinAmount}
          >
            {alternatives.map((alt, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <br />

          <label>
            Högsta antal:
            <br />
          </label>
          <select
            name="max-svar"
            id="max-svar"
            onChange={e => setUserOptionMaxAmount(Number(e.target.value))}
            defaultValue={userOptionMaxAmount}
          >
            {alternatives.map((alt, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      )}

      <br />

      {multiChoiceQuestion &&
        !exactAmountOfAlternatives &&
        userOptionMinAmount > userOptionMaxAmount && (
          <p>
            Du måste välja ett
            <br />
            &#39;högsta antal&#39; större än
            <br />
            eller lika med
            <br />
            &#39;minsta antal&#39;
          </p>
        )}

      <button
        type="button"
        disabled={
          multiChoiceQuestion && userOptionMinAmount > userOptionMaxAmount
        }
        onClick={() => {
          if (updateData) {
            update(updateData.id, {
              question,
              open: currentQuestion,
              alternatives,
              meeting: currentMeeting.id,
              min_number_of_selectable_alternatives: multiChoiceQuestion
                ? userOptionMinAmount
                : 1,
              max_number_of_selectable_alternatives: multiChoiceQuestion
                ? userOptionMaxAmount
                : 1,
            })
          } else {
            create({
              question,
              open: currentQuestion,
              alternatives,
              meeting: currentMeeting.id,
              min_number_of_selectable_alternatives: multiChoiceQuestion
                ? userOptionMinAmount
                : 1,
              max_number_of_selectable_alternatives: multiChoiceQuestion
                ? userOptionMaxAmount
                : 1,
            })
          }
        }}
      >
        {updateData ? 'Uppdatera omröstning' : 'Skapa ny omröstning'}
      </button>
    </div>
  )
}

export default AddVote
