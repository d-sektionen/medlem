import React, { useState, useEffect } from 'react'

import GeoPattern from 'geopattern'

import {pattern} from '../../scss/ui.module.scss'

const Pattern = ({ seed }) => {
  const [_pattern, setPattern] = useState(null)

  useEffect(
    () => {
      setPattern(GeoPattern.generate(seed).toDataUrl())
    },
    [seed]
  )

  return <div className={pattern} style={{ backgroundImage: _pattern }} />
}

Pattern.defaultProps = {
  seed: null,
}

export default Pattern
