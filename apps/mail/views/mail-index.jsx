import { utilService } from "../../../services/util.service.js";
import { MailList } from "../cmps/mail-list.jsx";

const { useNavigate, useParams, Link } = ReactRouterDOM

export function MailIndex({setIsHome}) {
    setIsHome(false)
    return <div>
        <Link to={'/mail/new'}>New mail</Link>
        <MailList/>
    </div>
}

