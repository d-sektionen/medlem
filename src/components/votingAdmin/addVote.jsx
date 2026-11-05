import { useState } from "react";

let currentKey = 0;
// creates an alternative with an unique key, do not manually create alternative objects
// the key does not match the id later given by the server.
const createAlternative = (existingData = {}) => {
  currentKey += 1;
  return { text: "", ...existingData, key: currentKey };
};

const AddVote = ({ currentMeeting, create }) => {
  const [question, setQuestion] = useState("");
  const [alternatives, setAlternatives] = useState([
    createAlternative({ text: "Vakant" }),
    createAlternative({ text: "Blankt" }),
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(true);

  return (
    <div>
      <label>
        Fråga
        <input
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </label>
      <hr />
      <ul>
        {alternatives.map((alt, i) => (
          <li key={alt.key}>
            <input
              value={alt.text}
              onChange={(e) => {
                const newVal = e.target.value;
                setAlternatives((prev) => [
                  ...prev.slice(0, i),
                  { ...prev[i], text: newVal },
                  ...prev.slice(i + 1),
                ]);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setAlternatives((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ]);
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
          setAlternatives((prev) => [...prev, createAlternative()]);
        }}
      >
        Lägg till alternativ
      </button>
      <hr />
      <label>
        <input
          type="checkbox"
          checked={currentQuestion}
          onChange={() => setCurrentQuestion((prev) => !prev)}
        />
        Nuvarande frågan
      </label>
      <hr />
      <button
        type="button"
        onClick={() => {
          create({
            question,
            open: currentQuestion,
            alternatives,
            meeting: currentMeeting.id,
          });
        }}
      >
        Skapa ny omröstning
      </button>
    </div>
  );
};

export default AddVote;
