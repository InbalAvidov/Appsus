import { mailService } from "../services/mail.service.js";
import { MailFilter } from "./mail-filter.jsx";
import { MailsPreview } from "./mail-preview.jsx";

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailList() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
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
    console.log(mails);
    return <div>
        <MailFilter filter={filter} setFilter={setFilter} />
        {!isLoading && <MailsPreview mails={mails} loadMails={loadMails} />}
        {isLoading && <p> Loading...</p>}
        {!mails.length && <p>No items to show..</p>}
    </div >

}