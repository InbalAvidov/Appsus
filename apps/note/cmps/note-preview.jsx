const { Link, Outlet } = ReactRouterDOM
const { useRef, useState, useEffect } = React

import { NoteService } from "../services/note.service.js"
import { NotePreviewByType } from "./note-preview-type.jsx"
import { NoteEdit } from "./note-edit.jsx"

export function NotePreview({note ,loadNotes}) {
    const [bgcColor,setBgcColor]=useState('#e8eaed')
    const [isPalette, setIsPalette] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    

    function onRemoveNote() {
        NoteService.remove(note.id).then(note => {
            NoteService.query().then(loadNotes())
        })
    }

    function onChangeColor({ target }){
       setBgcColor(target.value)
       setIsPalette(false)
    }

    function onPinNote(){
        NoteService.pinNote(note).then(note => {
            NoteService.query().then(loadNotes())
        })
    }

    function onEditNote(){
        setIsEdit(!isEdit)
    }

    function onDuplicateNote(){
        note.id = ''
        console.log(note);
        NoteService.save(note).then(note => {
            NoteService.query().then(loadNotes())
        })
    }

    return <div className="note-preview"  style={{backgroundColor: `${bgcColor}`}}>
        {!isEdit && <NotePreviewByType note={note} loadNotes={loadNotes} />}
        {isEdit && <div className="nested-route">
            <NoteEdit note={note} loadNotes={loadNotes}/>
        </div>}
        <div className="note-btns">
        <button title="Pin" onClick={onPinNote} className={note.isPinned ? "pin": ''}><span className="fa-solid fa-pin"></span></button>
        <button title="Delete" onClick={onRemoveNote}><span className="fa-solid fa-trash"></span></button>
        <button title="Duplicate" onClick={onDuplicateNote}><span className="fa-solid fa-copy"></span></button>
        <button title="Change color"><span className="fa-solid fa-palette" onClick={() => setIsPalette(true)}></span></button>
        <button title="Edit" onClick={onEditNote}><span className={isEdit ?"" :"fa-solid fa-edit"} ></span></button>
        {isPalette && <input type="color" value={bgcColor} onChange={(event) => onChangeColor(event)} />}
    </div>
    </div> 
   
}
        

        
        
       
       
        