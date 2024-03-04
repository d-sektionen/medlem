import React, { useState, useEffect } from 'react'

import GeoPattern from 'geopattern'

import {Ppattern} from '../../scss/ui.module.scss'

const Pattern = ({ seed }) => {
  const [pattern, setPattern] = useState(null)

  useEffect(
    () => {
      setPattern(GeoPattern.generate(seed).toDataUrl())
    },
    [seed]
  )

  return <div className={Ppattern} style={{ backgroundImage: pattern }} />
}

Pattern.defaultProps = {
  seed: null,
}

export default Pattern
