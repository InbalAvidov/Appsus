import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React

export function MailDetails() {
    const navigate = useNavigate()
    const params = useParams()
    const [mail, setMail] = useState(null)
    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })
    }

    if (!mail) return <div>Loading...</div>
    return <div className="mail-details">
        <p className="mail-subject">{mail.subject}</p>
        <p className="mail-address">{mail.from}</p>
        <p className="mail-body">{mail.body}</p>
        <p className="mail-sent-at">{new Date(mail.sentAt).toDateString()}</p>
        <Link className="mail-btn-back" to='/mail'>Back</Link>
        <Link className="mail-btn-response" to={`/mail/new/${mail.id}`}>Response</Link>
    </div>
}