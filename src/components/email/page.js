import React, { useState } from 'react';
import { GridContainer, GridItem } from '../ui/grid';
import BigPixels from '../layout/bigPixels';
import TitleChooser from '../ui/titleChooser';
import Editor from 'react-simple-wysiwyg';
import { emailBoxes } from '../../scss/email.module.scss';
import useSWR from 'swr'

/*
 * EmailPage for sending emails defined by templates in the backend.
 */

const EmailPage = ({ pageContext: { title } }) => {
    const [emailType, setEmailType] = useState(null)
    const [currentPreview, setCurrentPreview] = useState('')
    //const { data: emailTypes } = useSWR('/email/templates/')
    const { data: emailTypes } = {
        data: [
            { id: 1, name: 'Infomejl', category: 'InfU', description: 'Den första rutan är till för infochefens hörna. Du skriver en titel och sen en text. Rutan under är till för själva nyheterna och då kan du skriva titel för varje ny nyhet och text under titlarna.' },
            { id: 2, name: 'Sektionsmöte', category: 'Styrelse', description: 'Skicka kallelse om sektionsmöte' }
        ]
    }
    const [htmlSummary, setHtmlSummary] = useState('');
    const [htmlText, setHtmlText] = useState('');

    function htmlSummaryChange(e) {
        setHtmlSummary(e.target.value);
    }

    function htmlTextChange(e) {
        setHtmlText(e.target.value);
    }

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

    const { data: previews, mutate } = useSWR(
        () =>
            emailType &&
            `/email/?emails=${emailType.id}`
    )

    const create = async data => {
        const { data: newEmail } = await post('/email/emails/', data)
        mutate([...preview, newEmail])
        return newEmail
    }

    return (
        <BigPixels>
            <GridContainer>
                <GridItem fullWidth>
                    <TitleChooser
                        title={title}
                        choice={emailType}
                        setChoice={setEmailType}
                        categorizedChoices={categorizedItems}
                        label="name"
                    />
                </GridItem>
                {emailType && (
                    <>
                        <GridItem fullWidth>
                            <div className={emailBoxes}>
                                <h2>{emailType.name}</h2>
                                <p>{emailType.description}</p>
                            </div>
                            <div className={emailBoxes}>
                                <label>Här kan du skriva som en inledning eller sammanfattning som hamnar i början av mejlet. Exempelvis "Infochefens hörna":</label>
                                <Editor value={htmlSummary} onChange={htmlSummaryChange} />
                                <textarea value={htmlSummary} onChange={htmlSummaryChange} />
                            </div>
                            <div className={emailBoxes}>
                                <label>Här kan du skriva texten som du vill skicka ut. Exempelvis nyheterna i ett infomejl.:</label>
                                <Editor value={htmlText} onChange={htmlTextChange} />
                                <textarea value={htmlText} onChange={htmlTextChange} />
                            </div>
                            <div className={emailBoxes}>
                                <label>Skicka vid:</label>
                                <input type='datetime-local' required />
                            </div>
                        </GridItem>
                        <GridItem fullWidth>
                            <div className={emailBoxes}>
                                <h2>Preview</h2>
                                <p>
                                    Här kan du se redan publicerade mejls. Även de som ännu inte skickats. Klicka på en preview nedan för att få upp den längre ner.
                                    Detta kan liknas med julkalendern där admins kan se luckor i förväg.
                                </p>
                                <ul>
                                    {previews && previews.length ? (
                                        previews.map(preview => (
                                            <li style={{textDecoration: 'underline'}} key={preview.id} onClick={() => setCurrentPreview(preview.html)}>{preview.name}</li>
                                        ))
                                    ) : (
                                        <li style={{fontWeight: 'bold'}}>Inga previews tillgängliga</li>
                                    )}
                                </ul>
                                <hr/>
                                <div dangerouslySetInnerHTML={{ __html: currentPreview }} />
                            </div>
                        </GridItem>
                    </>
                )
                }
            </GridContainer>
        </BigPixels>
    )
}

export default EmailPage