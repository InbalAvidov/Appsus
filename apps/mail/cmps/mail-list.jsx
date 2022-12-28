import { mailService } from "../services/mail.service.js";
import { MailsPreview } from "./mail-preview.jsx";

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailList() {
    const [mails, setMails] = useState([])
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    useEffect(() => { loadMails() }, [filter])
    function loadMails() {
        mailService.query(filter).then((filterdMails) => {
            setMails(filterdMails)
        })
    }
    return <MailsPreview mails={mails} />

}

