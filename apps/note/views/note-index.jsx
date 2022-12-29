const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { NoteService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(NoteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        NoteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }

    
    return <main className="main-notes main-layout full">
        <NoteFilter setFilterBy={setFilterBy} />
        <NoteAdd loadNotes={loadNotes} />
        
        {notes && <NoteList notes={notes} loadNotes={loadNotes} />}
        {notes.length === 0 && <h2>No results...</h2>}
    </main>

}
