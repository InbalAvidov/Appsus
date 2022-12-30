
const { useRef } = React
const { Link } = ReactRouterDOM


export function MailNav({ filter, setFilter }) {
    const pageRef = useRef('inbox')
    function handleChange(page) {
        pageRef.current = page
        setFilter({ ...filter, page })
    }
    return<div className="main-filter">
     <ul className="side-bar">
        <li className="new-mail">
            <Link to={'/mail/new'} className="new"><span className="fa-solid fa-edit"></span></Link>
            <span className="content">New Mail</span>
        </li>
        <li onClick={() => handleChange('inbox')}
            className="inbox">
            <span className="fa-solid fa-envelope"></span>
            <span className="content">Inbox</span>
        </li>
        <li onClick={() => handleChange('starred')}
            className="star-bar">
            <span className="fa-solid fa-star"></span>
            <span className="content">Star</span>
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
