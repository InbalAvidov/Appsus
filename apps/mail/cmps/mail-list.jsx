import { mailService } from "../services/mail.service.js";
import { MailNav } from "./mail-nav.jsx";
import { MailPreview } from "./mail-preview.jsx";

const { useState, useEffect, useRef } = React
export function MailList({ onSetFilter, filter }) {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const countUnreadRef = useRef(0)
    useEffect(() => {
        useRef.current = 0
        setIsLoading(true)
        loadMails()
    }, [filter])

    function loadMails() {
        mailService.query(filter).then((filterdMails) => {
            setMails(filterdMails)
            setIsLoading(false)
        })
    }
    return <div className="main-mail">
        <h2 className="fa-solid fa-envelope unread-msg"><p>{countUnreadRef.current}</p></h2>
        <MailNav onSetFilter={onSetFilter} />
        {!isLoading && <table>
            <tbody className="mail-list">
                {mails.map(mail => {
                    if (!mail.isRead) countUnreadRef.current += 1
                    return <MailPreview mail={mail} loadMails={loadMails} key={mail.id} />
                })}</tbody>
        </table >}
        {isLoading && <p> Loading...</p>}
        {!mails.length && <p>No items to show..</p>}
    </div >

}