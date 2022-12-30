
const { useState, useEffect } = React

export function MailFilter({ onSetFilter }) {
    const [ filter, setFilter ] = useState('')
    useEffect(() => {
        onSetFilter('status', filter)
    }, [filter])
    function handleChange({ target }) {
        if (filter === '') {
            setFilter('unread')
            target.innerText = 'Show all'
        } else {
            setFilter('')
            target.innerText = 'Show only unread'
        }
    }
    return <button onClick={handleChange}>Show only unread</button>

}