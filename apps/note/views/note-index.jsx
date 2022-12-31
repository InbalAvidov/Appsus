const { useState, useEffect } = React
const { useParams } = ReactRouterDOM



import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { NoteService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(NoteService.getDefaultFilter())
    const { mailId } = useParams()

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        if (!mailId) return
        NoteService.turnMailToNote(mailId)
            .then(loadNotes())
    }, [mailId])

    function loadNotes() {
        NoteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }


    return <main className="main-notes">

            <div className="note-section">
                <NoteFilter setFilterBy={setFilterBy} />
                <NoteAdd loadNotes={loadNotes} />

                {notes && <NoteList notes={notes} loadNotes={loadNotes} />}
                {!notes.length || !notes && <h2>No results...</h2>}
            </div>
    </main>

}
