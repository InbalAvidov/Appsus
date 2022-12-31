
import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React


export function MailSearch({ onSetFilter, count }) {
    const [filter, setFilter] = useState({})
    const [status, setStatus] = useState('unread')
    useEffect(() => {
        onSetFilter(filter)

    }, [filter])
    function handleChange({ target }) {
        if (target.type === 'select-one') {
            setFilter((prevFilter) => ({ ...prevFilter, sort: target.value}))
        }
        else if (target.type === 'text') {
            let { value: txt } = target
            setFilter((prevFilter) => ({ ...prevFilter, txt }))
        } else {
            if (status === '') {
                setStatus('unread')
                target.innerText = 'Show only unread'
            }
            else {
                setStatus('')
                target.innerText = 'Show all'
            }
            setFilter((prevFilter) => ({ ...prevFilter, status: status }))
        }
    }
    return <div className="search-bar mail">
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
        <div className="msgs-status">
            <h2 className="fa-solid fa-envelope unread-msg"><p>{count}</p></h2>
            <button className="toogle-filter" onClick={handleChange}>Show only unread</button>
            <label htmlFor="sort-by">View by:
                <select name="sort-by" id="sort-by" onChange={handleChange}>
                    <option value="">None</option>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
            </label>
        </div>
    </div>
}
