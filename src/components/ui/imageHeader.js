import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import style from '../../scss/ui.module.scss'
import Pattern from './pattern'

const ImageHeader = ({ TitleTag, title, image }) => {
  return (
    <div className={style.imageHeader}>
      {image ? (
        <div
          className={style.image}
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <Pattern seed={title} />
      )}
      <div className={style.gradient} />
      <TitleTag className={style.title}>{title}</TitleTag>
    </div>
  )
}

ImageHeader.defaultProps = {
  title: '',
  TitleTag: 'h1',
  image: null,
}

ImageHeader.defaultProps = {
  TitleTag: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
}

export default ImageHeader
