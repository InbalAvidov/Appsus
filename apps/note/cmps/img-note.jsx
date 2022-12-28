import { NoteBtns } from "./note-btns.jsx";

export function Img({ note }) {
    return  <div className="note-preview">
    <div className="note-content">
    <img className="note-img" src={note.info.url}/>
    </div>
    <NoteBtns noteId={note.id} />
    </div>
}
