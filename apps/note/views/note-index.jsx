const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { NoteService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
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

    
    return <main className="main-notes">
        <NoteAdd loadNotes={loadNotes} />
        
        {notes && <NoteList notes={notes} loadNotes={loadNotes} />}
    </main>

}
