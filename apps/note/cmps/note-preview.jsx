const { Link, Outlet } = ReactRouterDOM
const { useRef, useState, useEffect } = React

import { NoteService } from "../services/note.service.js"
import { NotePreviewByType } from "./note-preview-type.jsx"
import { NoteEdit } from "./note-edit.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function NotePreview({ note, loadNotes }) {
    const [isPalette, setIsPalette] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isSelected, setIsSelected] = useState(false)


    function onRemoveNote(ev) {
        ev.stopPropagation()
        NoteService.remove(note.id).then(() => {
            showSuccessMsg('Your note was deleted!')
            loadNotes()
        })
    }

    function onChangeColor(ev) {
        ev.stopPropagation()
        NoteService.setNoteColor(note, ev.target.value)
            .then(() => loadNotes()
            )
    }

    function onPinNote() {
        NoteService.pinNote(note).then(() => {
            loadNotes()
        })
    }

    function onPalette(ev) {
        ev.stopPropagation()
        setIsPalette(!isPalette)
    }

    function onEditNote() {
        setIsEdit(!isEdit)
    }

    function onDuplicateNote() {
        note.id = ''
        console.log(note);
        NoteService.save(note).then(() => {
            loadNotes()
        })
    }

    function onSelectNote() {
        setIsSelected(!isSelected)
    }


    return <div className="note-preview" style={{ backgroundColor: `${note.color}` }} onClick={onSelectNote} >
        {!isEdit && <NotePreviewByType note={note} loadNotes={loadNotes} />}
        {
            isEdit && <div className="nested-route">
                <NoteEdit note={note} loadNotes={loadNotes} setIsEdit={setIsEdit} />
            </div>
        }
        <div className={isSelected ? "selected" + " note-btns" : "" + " note-btns"}>
            <button title="Pin" onClick={onPinNote} className={note.isPinned ? "pin" : ''}><span className="fa-solid fa-pin"></span></button>
            <button title="Delete" onClick={onRemoveNote}><span className="fa-solid fa-trash"></span></button>
            <button title="Duplicate" onClick={onDuplicateNote}><span className="fa-solid fa-copy"></span></button>
            <button title="Change color" onClick={onPalette}><span className="fa-solid fa-palette" ></span></button>
            <button title="Edit" onClick={onEditNote}><span className={isEdit ? "" : "fa-solid fa-edit"} ></span></button>
            {isPalette && <input className="palette" type="color" value={note.color} onChange={(event) => onChangeColor(event)} />}
        </div>
    </div >

}






