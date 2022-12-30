import { NoteService } from "../services/note.service.js"

const { useState, useEffect, useRef} = React

export function NoteFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(NoteService.getDefaultFilter())
    const [checked, setChecked] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        if (field === 'pin') {
            setChecked(!checked)
            value = !checked
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }

    function toggleMenu(ev){
        ev.preventDefault()
        setMenuOpen(!menuOpen)
    }
    return <div className="menu">
        <button><span className="fa-solid fa-menu menu-btn"></span></button>
        <form className="note-filter">
            <div className="search-bar">
                <input name="content" placeholder="search..." value={filterByToEdit.txt} onChange={handleChange} />
                <button onSubmit={onSubmitFilter}><span className="fa-solid fa-search"></span></button>
            </div>
            <label htmlFor="pin"><span className="fa-solid fa-pin"></span>
                <input style={{ accentColor: 'black' }} name="pin" id="pin" type="checkbox" onChange={handleChange} />
            </label>
            <label htmlFor="type" className="label-type">Type
                <select className="select-type" name="type" id="type" onChange={handleChange}>
                    <option name="type" value="">All</option>
                    <option name="type" value="note-txt">Text</option>
                    <option name="type" value="note-todos">List</option>
                    <option name="type" value="note-img">Image</option>
                    <option name="type" value="note-video">video</option>
                </select>
            </label>
        </form>
    </div>
}