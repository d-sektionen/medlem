import {} from '../../scss/richText.module.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React from 'react'

const RichText = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean', 'code-block'],
    ],
  }

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  )
}

export default RichText
