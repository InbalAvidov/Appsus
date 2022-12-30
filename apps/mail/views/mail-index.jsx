import { MailList } from "../cmps/mail-list.jsx";
import { MailSearch } from "../cmps/mail-search.jsx";


export function MailIndex() {
    return <div className="main-mail ">
        <MailSearch />
        <MailList />
    </div>
}

