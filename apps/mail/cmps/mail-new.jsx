import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteService } from "../../note/services/note.service.js"
import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailNew() {
    const nevigate = useNavigate()
    const params = useParams()
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    useEffect(() => {
        if (params.mailId) {
            mailService.get(params.mailId)
                .then(mail => {
                    setNewMail({ ...mail, to: mail.from, subject: mail.subject })
                })
                .catch(() => {
                    NoteService.get(params.mailId)
                        .then((note) => {
                            console.log('note', note)
                            setNewMail({ ...mailService.getEmptyMail(), ...setNoteToMail(note) })
                        })
                })
        }
        // else mailService.save({ ...newMail }).then(setNewMail)
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMail((prevmail) => ({ ...prevmail, [field]: value }))
        console.log('newMail', newMail)
        // mailService.save(newMail)
    }

    function click(ev, val) {
        ev.preventDefault()
        if (val === 'send') {
            newMail.sentAt = Date.now()
            showSuccessMsg('Mail was sent successfully')
        }
        if (val === 'back') showSuccessMsg('Mail was saved to drafts')
        mailService.save(newMail)
        nevigate(-1)
    }

    function setNoteToMail(note) {
        switch (note.type) {
            case 'note-txt':
                return {
                    subject: note.info.title,
                    body: note.info.txt
                }
            case 'note-img':
                return {
                    subject: note.info.title,
                    body: note.info.url
                }
            case 'note-todos':
                const text = note.info.todos.map(todo => todo.txt)
                return {
                    subject: note.info.title,
                    body: text
                }
            case 'note-video':
                return {
                    subject: note.info.title,
                    body: note.info.url
                }
        }
    }

    return <form className="mail-new">
        <label htmlFor="to" className="new-mail-to">To :
            <input
                type="text"
                name="to"
                placeholder="Enter email"
                value={newMail.to}
                onChange={handleChange}
            />
        </label>
        <label htmlFor="subject" className="new-mail-subject">Subject :
            <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={newMail.subject}
                onChange={handleChange}
            />
        </label>
        <label htmlFor="body" className="new-mail-body">Body :
            <input
                type="text"
                name="body"
                className="mail-msg"
                placeholder="Enter your messege"
                value={newMail.body}
                onChange={handleChange}
            />
        </label>
        <div className="link-btn">
            <button onClick={(ev) => { click(ev, 'send') }}>Send</button>
            <button onClick={(ev) => { click(ev, 'back') }}>Back</button>
        </div>
    </form>
}