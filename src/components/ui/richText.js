import {} from "../../scss/richText.module.scss"

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React from 'react'

const RichText = ({ value, onChange }) => {
  return <ReactQuill
    theme="snow"
    value={value}
    onChange={onChange}
  />
}

export default RichText
