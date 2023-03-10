import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { Link, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, loadMails }) {
    const navigate = useNavigate()
    let classStarred = mail.isStarred ? 'starred' : ''
    let classRead = mail.isRead ? 'read' : ''
    function toggleStarred({ target }) {
        target.classList.toggle('starred')
        return mailService.setIsStarred(mail)
            .then(() => {
                loadMails()
            })
    }
    function onRemove(mailId) {
        mailService.remove(mailId).then(loadMails)
        showSuccessMsg('Mail was deleted successfully')

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
        <td onClick={onMailClicked}>{mail.from}</td>
        <td onClick={onMailClicked}>{mail.subject}</td>
        <td onClick={onMailClicked}>{new Date(mail.sentAt).toDateString()}</td>
        <td><button onClick={toggleStarred}><span className={`star fa-solid fa-star ${classStarred}`} ></span></button>
            <button onClick={() => onRemove(mail.id)}><span className="fa-solid fa-trash btn-remove"></span></button></td>
    </tr>
}

