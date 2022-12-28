const {useState,useEffect} = React

import { NoteList } from "../cmps/note-list.jsx"

import { NoteService } from "../services/note.service.js"


export function NoteIndex({ setIsHome }) {
    setIsHome(false)

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(NoteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        NoteService.query(filterBy)
            .then(notes => setNotes(notes))
    }
    return <main className="main-notes">
        <div className="note-add flex space-between">
            <input placeholder="take a note" />
            <div className="note-add-btn">
            {/* <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" /> */}
                <button><span className="fa-regular fa-image"></span></button>
                <button><span className="fa-solid fa-list"></span></button>
                <button><span className="fa-solid fa-edit"></span></button>
            </div>
        </div>
        {notes && <NoteList notes={notes}/>}
    </main>

}
