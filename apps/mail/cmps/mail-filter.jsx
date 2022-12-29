
const { useRef } = React
const { Link } = ReactRouterDOM


export function MailNav({ filter, setFilter }) {
    const pageRef = useRef('inbox')
    function handleChange(page) {
        pageRef.current = page
        setFilter({ ...filter, page })
    }
    return <ul className="side-bar">
        <li>
            <Link to={'/mail/new'} className="new"><span className="fa-solid fa-edit"></span></Link>
        </li>
        <li onClick={() => handleChange('inbox')}
            className="inbox">
            <span className="fa-solid fa-envelope"></span>
        </li>
        <li onClick={() => handleChange('marked')}
            className="marked">
            <span className="fa-solid fa-star"></span>
        </li>
        <li onClick={() => handleChange('sent')}
            className="sent">
            <span className="fa-regular fa-sent"></span>
        </li>
        <li onClick={() => handleChange('drafts')}
            className="drafts">
            <span className="fa-regular fa-draft"></span>
        </li>
    </ul>
}
