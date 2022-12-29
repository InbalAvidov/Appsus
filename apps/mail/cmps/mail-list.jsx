import { mailService } from "../services/mail.service.js";
import { MailNav } from "./mail-filter.jsx";
import { MailPreview } from "./mail-preview.jsx";

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

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
    return <div className="main-mail">
        <MailNav filter={filter} setFilter={setFilter} />
        {!isLoading && <table>
            <tbody className="mail-list">
                <tr>
                    <th>From</th>
                    <th>Subject</th>
                    <th>At</th>
                </tr>
                {mails.map(mail => {
                    return <MailPreview mail={mail} key={mail.id} />
                })}</tbody>
        </table >}
        {isLoading && <p> Loading...</p>}
        {!mails.length && <p>No items to show..</p>}
    </div >

}