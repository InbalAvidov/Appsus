import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailSearch } from "../cmps/mail-search.jsx";

const { useState, useEffect, useRef } = React

export function MailIndex() {
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    const [count, setCount] = useState(0)
    function onSetFilter(filterFromCmps) {
        setFilter({ ...filter, ...filterFromCmps })
    }
    useEffect(() => {
        mailService.query().then(mails => {
            setCount(0)
            mails.forEach(mail => {
                if (!mail.isRead) {
                    setCount(prevCount => prevCount += 1)
                }
            })
            console.log('count', count)
        })
    }, [])
    return <div className="main-mail ">
        <MailSearch onSetFilter={onSetFilter} count={count} />
        <MailList onSetFilter={onSetFilter} filter={filter} />
    </div>
}

