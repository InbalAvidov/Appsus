import { NoteBtns } from "./note-btns.jsx";

export function Todos({ note }) {
    return<div className="note-preview">
    <div className="note-content">
    <h2>{note.info.label}</h2>
    <ul>
    {note.info.todos.map((todo,idx)=> <li key={idx}>{todo.txt}</li>)}
    </ul>
    </div>
    <NoteBtns noteId={note.id} />
    </div>
}

