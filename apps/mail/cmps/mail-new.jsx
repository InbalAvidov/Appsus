import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailNew() {
    const params = useParams()
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    console.log(params.mailId)
    useEffect(()=>{
        if (params.mailId) {
            mailService.get(params.mailId)
                .then(mail => {
                    console.log(mail)
                    setNewMail({ to: mail.from, subject: mail.subject })
                })
        }
    },[])
    return <form>
        <label htmlFor="to">To:
            <input
                type="text"
                name="to"
                placeholder="Enter mail"
                value={newMail.to}
            />
        </label>
        <label htmlFor="subject">Subject:
            <input
                type="text"
                name="subject"
                placeholder="Enter mail"
                value={newMail.subject}
            />
        </label>
        <button onSubmit={''}>Save to drafts</button>
        <button onSubmit={''}>Send</button>
    </form>
}