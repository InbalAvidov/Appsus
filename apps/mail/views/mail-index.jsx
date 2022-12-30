import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailSearch } from "../cmps/mail-search.jsx";

const { useState } = React

export function MailIndex() {
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    function onSetFilter(type, val) {
        setFilter({ ...filter, [type]: val })
    }
    return <div className="main-mail ">
        <MailSearch onSetFilter={onSetFilter} />
        <MailList onSetFilter={onSetFilter} filter={filter} />
    </div>
}

