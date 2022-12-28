import { NoteService } from "../services/note.service.js"

export function NoteBtns({noteId}){
    function onRemoveNote(){
        NoteService.remove(noteId).then()
    }
    return <div className="note-btns">
        <button onClick={onRemoveNote}><span className="fa-solid fa-trash"></span></button>
        <button><span className="fa-solid fa-palette"></span></button>
        <button><span className="fa-solid fa-edit"></span></button>
    </div>
}