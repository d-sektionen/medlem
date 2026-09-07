import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from '../../scss/ui.module.scss'
import Pattern from './pattern'

const ImageHeader = ({ TitleTag = 'h1', title = '', image = null }) => {
  return (
    <div className={styles.imageHeader}>
      {image ? (
        <div className={styles.Image} style={{ backgroundImage: `url(${image})` }} />
      ) : (
        <Pattern seed={title} />
      )}
      <div className={styles.gradient} />
      <TitleTag className={styles.Title}>{title}</TitleTag>
    </div>
  )
}

ImageHeader.propTypes = {
  TitleTag: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
}

export default ImageHeader
