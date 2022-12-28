
const { useRef, useState, useEffect } = React

import { NoteService } from "../services/note.service.js"
import { DynamicCmp } from "./dynamic-note.jsx"

export function NotePreview({note ,loadNotes}) {
    const [bgcColor,setBgcColor]=useState('#e8eaed')
    const [isPalette, setIsPalette] = useState(false)
    

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

    return <div className="note-preview"  style={{backgroundColor: `${bgcColor}`}}>
        <DynamicCmp note={note} loadNotes={loadNotes} />
        <div className="note-btns">
        <button onClick={onPinNote} className={note.isPinned ? "pin": ''}><span className="fa-solid fa-pin"></span></button>
        <button onClick={onRemoveNote}><span className="fa-solid fa-trash"></span></button>
        <button><span className="fa-solid fa-palette" onClick={() => setIsPalette(true)}></span></button>
        <button><span className="fa-solid fa-edit" ></span></button>
        {isPalette && <input type="color" value={bgcColor} onChange={(event) => onChangeColor(event)} />}
    </div>
    </div> 
   
}
        

        
        
       
       
        