import { MailList } from "../cmps/mail-list.jsx";


const {Link } = ReactRouterDOM

export function MailIndex() {
    return <div>
        <Link to={'/mail/new'} className ="new">New mail</Link>
        <MailList/>
    </div>
}

