import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailsPreview({ mails, loadMails }) {
    function onRemove(mailId) {
        mailService.remove(mailId).then(loadMails)
    }
    return < table >
        <tbody>
            <tr>
                <th>From</th>
                <th>Subject</th>
                <th>At</th>
            </tr>
            {mails.map(mail => {
                return <tr key={mail.id}>
                    <td>{mail.from}</td>
                    <td>{mail.subject}</td>
                    <td>{new Date(mail.sentAt).toDateString()}</td>
                    {mail.sentAt &&<td><Link to={`/mail/${mail.id}`}>See more...</Link></td>}
                    {!mail.sentAt &&<td><Link to={`/mail/new/${mail.id}`}>Edit</Link></td>}
                    <td><button onClick={() => onRemove(mail.id)}>remove</button></td>
                </tr>
            })}
        </tbody>
    </table >
}

