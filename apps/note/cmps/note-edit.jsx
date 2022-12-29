import { NoteAdd } from "./note-add.jsx"
import { NoteEditByType } from "./note-edit-type.jsx"


export function NoteEdit({note , loadNotes}) {
    return <NoteAdd note={note}  loadNotes={loadNotes} />
}