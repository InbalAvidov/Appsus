import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    function onRemove(mailId) {
        mailService.remove(mailId).then(loadMails)
    }
    return <tr key={mail.id} className="mail-row">
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{new Date(mail.sentAt).toDateString()}</td>
        {mail.sentAt && <td><Link to={`/mail/${mail.id}`}>See more...</Link></td>}
        {!mail.sentAt && <td><Link to={`/mail/new/${mail.id}`}>Edit</Link></td>}
        <td><button onClick={() => onRemove(mail.id)}>remove</button></td>
    </tr>
}

