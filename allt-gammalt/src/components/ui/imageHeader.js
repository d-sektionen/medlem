import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {imageHeader, image, gradient, title} from '../../scss/ui.module.scss'
import Pattern from './pattern'

const ImageHeader = ({ TitleTag, _title, _image }) => {
  return (
    <div className={imageHeader}>
      {_image ? (
        <div
          className={image}
          style={{ backgroundImage: `url(${_image})` }}
        />
      ) : (
        <Pattern seed={_title} />
      )}
      <div className={gradient} />
      <TitleTag className={title}>{_title}</TitleTag>
    </div>
  )
}

ImageHeader.defaultProps = {
  _title: '',
  TitleTag: 'h1',
  _image: null,
}

ImageHeader.defaultProps = {
  TitleTag: PropTypes.string,
  _title: PropTypes.string,
  _image: PropTypes.string,
}

export default ImageHeader
