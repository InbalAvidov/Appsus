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
                }).catch(mailService.save(newMail)
                    .then(updatedMail => {
                        setNewMail(updatedMail)
                    }))
        }
    }, [])

    useEffect(() => { mailService.save(newMail) }, [newMail])

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMail((prevmail) => {
            console.log(prevmail)
            return { ...prevmail, [field]: value }
        })
        console.log(newMail)
    }

    function click(ev, val) {
        ev.preventDefault()
        switch (val) {
            case 'nev':
                nevigate(-1)
                break;
            default:
                newMail.sentAt = Date.now()
                nevigate('/mail')
                break;
        }
    }

    return <form>
        <label htmlFor="to">To:
            <input
                type="text"
                name="to"
                placeholder="Enter mail"
                value={newMail.to}
                onChange={handleChange}
            />
        </label>
        <label htmlFor="subject">Subject:
            <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={newMail.subject}
                onChange={handleChange}
            />
        </label>
        <label htmlFor="body">Body:
            <input
                type="text"
                name="body"
                placeholder="Enter youe messege"
                value={newMail.body}
                onChange={handleChange}
            />
        </label>
        <button onClick={(ev) => { click(ev, 'send') }}>Send</button>
        <button onClick={(ev) => { click(ev, 'nev') }}>Back</button>
    </form>
}