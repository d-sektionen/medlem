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

  const [userOptionAmount, setUserOptionAmount] = useState(
    updateData ? updateData.number_of_selectable_alternatives : 1
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
      <label>Antal svar:</label>
      <select
        name="svar"
        id="svar"
        onChange={e => setUserOptionAmount(e.target.value)}
      >
        {alternatives.map((alt, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <hr />
      <button
        type="button"
        onClick={() => {
          if (updateData) {
            update(updateData.id, {
              question,
              open: currentQuestion,
              alternatives,
              meeting: currentMeeting.id,
            })
          } else {
            create({
              question,
              open: currentQuestion,
              alternatives,
              meeting: currentMeeting.id,
              number_of_selectable_alternatives: userOptionAmount,
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
