const {useState,useEffect} = React
const { Link } = ReactRouterDOM


import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { NoteService } from "../services/note.service.js"


export function NoteIndex({ setIsHome }) {
    setIsHome(false)

    const [notes, setNotes] = useState([])
    const [text, setText] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [noteType, setNoteType] = useState('note-txt')
    const [filterBy, setFilterBy] = useState(NoteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
    }, [filterBy,isEdit])

    function loadNotes() {
        NoteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }

    function addNote(){
        NoteService.addNote(text,noteType).then(note => {
            setText('')
            loadNotes()
        })
        
    }

    function handleChange({target}){
        const {value} = target
        setText(value)
    }
    return <main className="main-notes">
       <div className="note-add flex space-between">
            <input placeholder={noteType==='note-img' ? "upload a photo" : noteType==='note-todos' ? 'Title,task,task...' : 'Take a note'} onClick={()=>setIsEdit(true)} onChange={handleChange} value={text}/>
            <div className="note-add-btn">
            {/* <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" /> */}
                <button onClick={()=>setNoteType('note-img')} className={noteType==='note-img' ? 'active':''}><span className="fa-regular fa-image"></span></button>
                <button onClick={()=>setNoteType('note-todos')} className={noteType==='note-todos' ? 'active':''}><span className="fa-solid fa-list"></span></button>
                <button onClick={()=>setNoteType('note-txt')} className={noteType==='note-txt' ? 'active':''}><span className="fa-solid fa-edit"></span></button>
                <button onClick={addNote}>Add</button>
            </div>
        </div>
        {notes && <NoteList notes={notes} loadNotes={loadNotes}/>}
    </main>

}
