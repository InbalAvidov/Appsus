
const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM


export function MailFilter({ filter, setFilter }) {
    const pageRef = useRef('inbox')
    function handleChange(page) {
        pageRef.current = page
        setFilter({ ...filter, page })
    }
    return <ul>
        <li><button onClick={() => handleChange('inbox')}>Inbox</button></li>
        <li><button onClick={() => handleChange('marked')}>Marked</button></li>
        <li><button onClick={() => handleChange('sent')}>Sent</button></li>
        <li><button onClick={() => handleChange('drafts')}>Drafts</button></li>
    </ul>
}