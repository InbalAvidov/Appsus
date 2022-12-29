import { NoteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(NoteService.getDefaultFilter())

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }
    console.log(filterByToEdit);
    return <form className="note-filter">
        <label htmlFor="type">Type</label>
        <select name="type" id="type" onChange={handleChange}>
            <option name="type" value="">All</option>
            <option name="type" value="note-txt">Text</option>
            <option name="type" value="note-todos">List</option>
            <option name="type" value="note-img">Image</option>
            <option name="type" value="note-video">video</option>
        </select>
        <div className="search-bar">
            <input name="txt" placeholder="search..." value={filterByToEdit.txt} onChange={handleChange} />
            <button onSubmit={onSubmitFilter}><span className="fa-solid fa-search"></span></button>
        </div>
    </form>
}