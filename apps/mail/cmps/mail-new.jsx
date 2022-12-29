import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailNew() {
    const nevigate = useNavigate()
    const params = useParams()
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    useEffect(() => {
        if (params.mailId) {
            console.log('have mail id')
            mailService.get(params.mailId)
                .then(mail => {
                    setNewMail({ ...mail, to: mail.from, subject: mail.subject })
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
        if (val === 'send') newMail.sentAt = Date.now()
        mailService.save(newMail)
        nevigate(-1)
    }

    return <form className="mail-new">
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
        <button onClick={(ev) => { click(ev, 'back') }}>Back</button>
    </form>
}