import { mailService } from "../services/mail.service.js"

const { useState ,useEffect} = React


export function MailSearch({ onSetFilter }) {
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter('txt', filter.txt)
    }, [filter])
    function handleChange({ target }) {
        let { value: txt } = target
        setFilter((filter) => ({ ...filter, txt }))
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
    </div>
}
