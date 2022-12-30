import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM


export function MailNav({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const pageRef = useRef('inbox')
    useEffect(() => {
        onSetFilter('page', filterByToEdit.page)
    }, [filterByToEdit])

    function handleChange(page) {
        pageRef.current = page
        setFilterByToEdit({ ...filterByToEdit, page: page })
    }
    return <div className="main-filter">
        <ul className="side-bar">
            <li className="new-mail">
                <Link to={'/mail/new'} className="new"><span className="fa-solid fa-edit"></span>
                <span className="content">New Mail</span>
                </Link>
            </li>
            <li onClick={() => handleChange('inbox')}
                className="inbox">
                <span className="fa-solid fa-envelope"></span>
                <span className="content">Inbox</span>
            </li>
            <li onClick={() => handleChange('starred')}
                className="star-bar">
                <span className="fa-solid fa-star"></span>
                <span className="content">Starred</span>
            </li>
            <li onClick={() => handleChange('sent')}
                className="sent">
                <span className="fa-solid fa-send"></span>
                <span className="content">Sent</span>
            </li>
            <li onClick={() => handleChange('drafts')}
                className="drafts">
                <span className="fa-regular fa-draft"></span>
                <span className="content">Drafts</span>
            </li>
        </ul>
    </div>
}
