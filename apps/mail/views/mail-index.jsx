import { MailList } from "../cmps/mail-list.jsx";

export function MailIndex({setIsHome}) {
    setIsHome(false)
    return <div>
        <MailList/>
    </div>
}

