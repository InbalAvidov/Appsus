import { mailService } from "../services/mail.service.js";
import { MailNav } from "./mail-nav.jsx";
import { MailPreview } from "./mail-preview.jsx";

const { useState, useEffect, useRef } = React
export function MailList({ onSetFilter, filter }) {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
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
        <MailNav onSetFilter={onSetFilter} />
        {!isLoading && <table className='main-mail'>
            <tbody className="mail-list">
                {isLoading && <tr><td> Loading...</td></tr>}
                {!mails.length && <tr><td> No items to show...</td></tr>}
                {mails.map(mail => {
                    return <MailPreview mail={mail} loadMails={loadMails} key={mail.id} />
                })}</tbody>
        </table >}
    </div >

}