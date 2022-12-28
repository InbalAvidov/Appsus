import { NoteBtns } from "./note-btns.jsx";

export  function Txt({ note }) {
    console.log(note);
    return <div className="note-preview">
    <div className="note-content">
    <p>{note.info.txt}</p>
    </div>
    <NoteBtns noteId={note.id} />
    </div>
}