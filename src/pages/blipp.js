import React from 'react'
import Blipp from '../components/blipp'
import useKeyPress from '../components/blipp/useKeyPress'
import { useEndpoint } from '../components/request'

const BlippPage = () => {
  const [scanners] = useEndpoint({ endpoint: '/voting/scanners/' })
  const shiftDown = useKeyPress('Shift')

  return scanners ? (
    <Blipp scanners={scanners.reverse()} shiftDown={shiftDown} />
  ) : null
}

export default BlippPage
