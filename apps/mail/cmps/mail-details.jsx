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
    return <div>
        <p>{mail.subject}</p>
        <p>{mail.from}</p>
        <p>{mail.body}</p>
        <p>{new Date(mail.sentAt).toDateString()}</p>
        <Link to='/mail'>Back</Link>
        <Link to='/mail/new'>Response</Link>
    </div>
}