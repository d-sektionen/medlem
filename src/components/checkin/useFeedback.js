import { useEffect, useState } from 'react'

export default function useFeedback() {
  // State for keeping track of whether key is pressed
  const [feedback, setFeedback] = useState({})

  let timeout = null

  // Remove event listeners on cleanup
  // Empty array ensures that effect is only run on mount and unmount
  useEffect(
    () => () => {
      clearTimeout(timeout)
    },
    []
  )

  return [
    feedback,
    f => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setFeedback({})
      }, 1500)
      setFeedback(f)
    },
  ]
}
