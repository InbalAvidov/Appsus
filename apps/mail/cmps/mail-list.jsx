import { mailService } from "../services/mail.service.js";
import { MailNav } from "./mail-filter.jsx";
import { MailPreview } from "./mail-preview.jsx";

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
                    {/* <span className="star fa-solid fa-star"></span> */}
                    <th> starred</th>
                    <th>From</th>
                    <th>Subject</th>
                    <th>At</th>
                </tr>
                {mails.map(mail => {
                    return <MailPreview mail={mail} loadMails={loadMails} key={mail.id} />
                })}</tbody>
        </table >}
        {isLoading && <p> Loading...</p>}
        {!mails.length && <p>No items to show..</p>}
    </div >

}