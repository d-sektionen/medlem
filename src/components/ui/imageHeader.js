import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {imageHeader, Image, gradient, Title} from '../../scss/ui.module.scss'
import Pattern from './pattern'

const ImageHeader = ({ TitleTag, title, image }) => {
  return (
    <div className={imageHeader}>
      {image ? (
        <div
          className={Image}
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <Pattern seed={title} />
      )}
      <div className={gradient} />
      <TitleTag className={Title}>{title}</TitleTag>
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
