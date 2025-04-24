import React, { useState, useMemo } from 'react';
import { Button } from '../ui/buttons'
import { GridContainer, GridItem } from '../ui/grid';
import BigPixels from '../layout/bigPixels';
import TitleChooser from '../ui/titleChooser';
import Editor from 'react-simple-wysiwyg';
import { emailBoxes, fieldError, sendSuccess } from '../../scss/email.module.scss';
import useSWR from 'swr'
import { post } from '../request'
import DateTimePicker from '../form/dateTimePicker';

/*
 * EmailPage for sending emails defined by templates in the backend.
 */

const EmailPage = ({ pageContext: { title } }) => {
  const [emailType, setEmailType] = useState(null)
  const [subject, setSubject] = useState(emailType?.subject || '');
  const [htmlContent, setHtmlContent] = useState('');
  const [sendAt, setSendAt] = useState(new Date());
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");

  const { data: emailTypes } = useSWR('/mail/mail-template/')

  const categorizedItems = emailTypes
    ? emailTypes.reduce((accumulator, itm) => {
      const cat = itm.category || 'Okategoriserat'
      if (Object.prototype.hasOwnProperty.call(accumulator, cat)) {
        return {
          ...accumulator,
          [cat]: [...accumulator[cat], itm],
        }
      }
      return { ...accumulator, [cat]: [itm] }
    }, {})
    : {}

  const handleEmailTypeChange = (type) => {
    setHtmlContent(type.template)
    setEmailType(type)
  }

  const handleSend = async (url) => {
    const emailData = {
      subject: subject,
      category: emailType.category,
      html: htmlContent,
      send_at: sendAt,
    };

    await post(url, emailData)
      .then((request) => {
        setStatus("Mejl skickat!")
        setTimeout(() => {
          setStatus("")
        }, 5000)
        setErrors(null)
      })
      .catch((request) => {
        setErrors(request.response.data)
      });
  };

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={emailType}
            setChoice={handleEmailTypeChange}
            categorizedChoices={categorizedItems}
            label="name"
          />
        </GridItem>
        {emailType && (
          <>
            <GridItem fullWidth>
              <div className={emailBoxes}>
                <h2>{emailType.name}</h2>
              </div>
              <div className={emailBoxes}>
                <label>Här kan du skriva ämnet till mejlet, din typ av mejl kan ha ett förslag på ämne redan:</label>
                <input type='text' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                {errors && errors.subject && <p className={fieldError}>{errors.subject.join(', ')}</p>}
              </div>
              <div className={emailBoxes}>
                <label>Innehåll:</label>
                <Editor value={htmlContent} onChange={(e) => setHtmlContent(e.target.value)} />
                {errors && errors.html && <p className={fieldError}>{errors.html.join(', ')}</p>}
              </div>
              <div className={emailBoxes}>
                <label>Skicka vid:</label>
                <DateTimePicker value={sendAt} onChange={setSendAt}></DateTimePicker>
                {errors && errors.send_at && <p className={fieldError}>{errors.send_at.join(', ')}</p>}
              </div>
              <div className={emailBoxes}>
                <Button onClick={() => handleSend("/mail/mail/send/")}>Skicka {emailType.name}</Button>
                <Button onClick={() => handleSend("/mail/mail/send_sample/")}>Skicka förhandsgranskning</Button>
              </div>
              {status && <div className={emailBoxes}><p className={sendSuccess}>{status}</p></div>}
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default EmailPage
