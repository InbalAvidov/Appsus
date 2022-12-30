import { mailService } from "../services/mail.service.js"

const { Link, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, loadMails }) {
    const navigate = useNavigate()
    let classStarred = mail.isStarred ? 'starred' : ''
    let classRead = mail.isRead ? '' : 'unread'
    function toggleStarred({ target }) {
        target.classList.toggle('starred')
        return mailService.setIsStarred(mail)
            .then(() => {
                loadMails()
            })
    }
    function onRemove(mailId) {
        mailService.remove(mailId).then(loadMails)
    }
    function onMailClicked() {
        mailService.setIsRead(mail)
            .then(() => {
                if (mail.sentAt) {
                    navigate(`/mail/${mail.id}`)
                } else {
                    navigate(`/mail/new/${mail.id}`)
                }
            })
    }
    return <tr key={mail.id} className={classRead + " mail-row"}>
        <td className={`star fa-solid fa-star ${classStarred}`} onClick={toggleStarred}></td>
        <td onClick={onMailClicked}>{mail.from}</td>
        <td onClick={onMailClicked}>{mail.subject}</td>
        <td onClick={onMailClicked}>{new Date(mail.sentAt).toDateString()}</td>
        <td><button onClick={() => onRemove(mail.id)}>Remove</button></td>
    </tr>
}

