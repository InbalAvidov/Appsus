
import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React


export function MailSearch({ onSetFilter, count }) {
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    const [status, setStatus] = useState('unread')
    useEffect(() => {
        onSetFilter(filter)

    }, [filter])
    function handleChange({ target }) {
        if (target.type === 'text') {
            let { value: txt } = target
            setFilter((prevFilter) => ({ ...prevFilter, txt }))
        } else {
            if (status === '') {
                setStatus('unread')
                target.innerText = 'Unread'
            }
            else {
                setStatus('')
                target.innerText = 'All'
            }
            setFilter((prevFilter) => ({ ...prevFilter, status: status }))
        }
    }
    return <div className="mail-header">
        <form className="search-bar mail">
        <label htmlFor="search">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={filter.txt}
                onChange={handleChange}
            />
        </label>
        <button><span className="fa-solid fa-search"></span></button>
        </form>
            <button className="toggle-filter" onClick={handleChange}>Unread</button>
            <h2 className="fa-solid fa-envelope unread-msg"><p>{count}</p></h2>
    </div>
}
